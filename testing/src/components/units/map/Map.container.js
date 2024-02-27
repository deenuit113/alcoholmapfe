import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import MapUI from './Map.presenter';
import Head from 'next/head';
import Script from 'next/script';

export default function MapPage() {
    
    const router = useRouter()

    const [keyword, setKeyword] = useState("술집");
    const [kwError, setKwError] = useState("");
    const [container, setContainer] = useState(null);
    const [options, setOptions] = useState(null);
    const [map, setMap] = useState(null);
    const [ps, setPs] = useState(null);
    const [infowindow, setInfowindow] = useState(null);
    const [markers, setMarkers] = useState([])
    const [userPosition,setUserPosition] = useState(null);
    const [radius, setRadius] = useState(1000);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 사용자의 현재 위치를 받아오기
                const userPosition = await getUserPosition();
                setUserPosition(userPosition)
                console.log('User Position:', userPosition);
    
                // 초기 지도 설정
                const options = {
                    center: new window.kakao.maps.LatLng(
                        userPosition.coords.latitude,
                        userPosition.coords.longitude
                    ),
                    level: 3,
                };
    
                setOptions(options);
    
                // 기존의 맵이 있으면 그 맵을 사용하고, 없으면 새로운 맵을 생성
                const newMap = map || new window.kakao.maps.Map(
                    document.getElementById('map'),
                    options
                );
                setMap(newMap);
    
                const newPs = new window.kakao.maps.services.Places();
                setPs(newPs);
    
                const newInfowindow = new window.kakao.maps.InfoWindow({
                    map: newMap,
                    position: options.center,
                    content: '',
                });
                setInfowindow(newInfowindow);
                
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    
        return () => {
            // cleanup
        };
    }, [map]); // map이 변경될 때만 useEffect 재실행

    // -----------------------------------------------

    const getUserPosition = () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => reject(error)
            );
        });
    };

    function calculateDistance(latlng1, latlng2) { //위도 경도 값으로 거리 계산
        // 각도를 라디안으로 변환
        function toRad(value) {
            return (value * Math.PI) / 180;
        }
    
        const R = 6371; // 지구의 반지름 (단위: 킬로미터)
    
        const lat1 = latlng1.getLat();
        const lon1 = latlng1.getLng();
        const lat2 = latlng2.getLat();
        const lon2 = latlng2.getLng();
    
        // 위도 및 경도의 차이 계산
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);
    
        // Haversine 공식
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        // 거리 계산 (단위: 킬로미터)
        const distance = R * c;
    
        return distance;
    }

// 키워드 검색을 요청하는 함수입니다
    const searchPlaces = (event) => {
        const keyword = document.getElementById('keyword').value;
        event.preventDefault();

        if (!keyword.replace(/^\s+|\s+$/g, '')) {
            alert('키워드를 입력해주세요!');
            return false;
        }

        // 사용자의 위치를 기반으로 검색 수행
        ps.keywordSearch(keyword, placesSearchCB, 
            {
                location: new window.kakao.maps.LatLng(userPosition.latitude, userPosition.longitude),
            }
        );
    }

    const placesSearchCB = (data, status, pagination) => {
        if (status === kakao.maps.services.Status.OK) {
    
            // 정상적으로 검색이 완료됐으면
            // 검색 목록과 마커를 표출합니다
            displayPlaces(data);
    
            // 페이지 번호를 표출합니다
            displayPagination(pagination);
    
        } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
    
            alert('검색 결과가 존재하지 않습니다.');
            return;
    
        } else if (status === kakao.maps.services.Status.ERROR) {
    
            alert('검색 결과 중 오류가 발생했습니다.');
            return;
    
        }
    }

    const displayPlaces = (places) => {
        let listEl = document.getElementById('placesList'), 
            menuEl = document.getElementById('menu_wrap'),
            fragment = document.createDocumentFragment(), 
            bounds = new kakao.maps.LatLngBounds(), 
            listStr = '';
        
        // 검색 결과 목록에 추가된 항목들을 제거합니다
        removeAllChildNods(listEl);
    
        // 지도에 표시되고 있는 마커를 제거합니다
        removeMarker();
        
        // 마커 배열 초기화
        setMarkers([])
    
        for (let i=0; i<places.length; i++ ) {
            // 마커를 생성하고 지도에 표시합니다
            let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
                marker = addMarker(placePosition, i), 
                itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
    
            // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
            // LatLngBounds 객체에 좌표를 추가합니다
            bounds.extend(placePosition);
    
            // 마커와 검색결과 항목에 mouseover 했을때
            // 해당 장소에 인포윈도우에 장소명을 표시합니다
            // mouseout 했을 때는 인포윈도우를 닫습니다

            /*(function (marker, title, place) {
                kakao.maps.event.addListener(marker, 'click', function () {
                    displayInfowindow(marker, title, place);
                });
    
                itemEl.onclick = function () {
                    displayInfowindow(marker, title, place);
                };
            })(marker, places[i].place_name, places[i]);*/

            (function(marker, title) {
                kakao.maps.event.addListener(marker, 'mouseover', function() {
                    displayInfowindow(marker, title);
                });
    
                kakao.maps.event.addListener(marker, 'mouseout', function() {
                    infowindow.close();
                });
    
                itemEl.onmouseover =  function () {
                    displayInfowindow(marker, title);
                };
    
                itemEl.onmouseout =  function () {
                    if (infowindow) {
                        infowindow.close();
                    }
                };
            })(marker, places[i].place_name);
    
            fragment.appendChild(itemEl);
        }
    
        // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
        listEl.appendChild(fragment);
        menuEl.scrollTop = 0;
    
        // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
        if (map) {
            map.setBounds(bounds);
        }
    }

    const getListItem = (index, places) => {

        const el = document.createElement('li'),
        itemStr = '<span class="markerbg marker_' + (index+1) + '"></span>' +
                    '<div class="info">' +
                    '   <h5>' + places.place_name + '</h5>';
    
        if (places.road_address_name) {
            itemStr += '    <span>' + places.road_address_name + '</span>' +
                        '   <span class="jibun gray">' +  places.address_name  + '</span>';
        } else {
            itemStr += '    <span>' +  places.address_name  + '</span>'; 
        }
                     
          itemStr += '  <span class="tel">' + places.phone  + '</span>' +
                    '</div>';           
    
        el.innerHTML = itemStr;
        el.className = 'item';
    
        return el;
    }

    const addMarker = (position, idx, title) => {
        let imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png', // 마커 이미지 url, 스프라이트 이미지를 씁니다
            imageSize = new window.kakao.maps.Size(36, 37),  // 마커 이미지의 크기
            imgOptions = {
                spriteSize: new window.kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                spriteOrigin: new window.kakao.maps.Point(0, (idx * 46) + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                offset: new window.kakao.maps.Point(13, 37) // 마커 좌표에 일치시킬 이미지 내에서의 좌표
            },
        markerImage = new window.kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
        marker = new window.kakao.maps.Marker({
            position: position, // 마커의 위치
            image: markerImage
        });
    
        marker.setMap(map); // 지도 위에 마커를 표출합니다
        setMarkers(prevMarkers => [...prevMarkers, marker]);  // 배열에 생성된 마커를 추가합니다
    
        return marker;
      };

    const removeMarker = () => {
        // 이전에 생성된 마커들 제거
        markers.forEach(marker => marker.setMap(null));
        setMarkers([]); // 배열 초기화
    };

    const displayPagination = (pagination) => {
        let paginationEl = document.getElementById('pagination'),
            fragment = document.createDocumentFragment(),
            i; 
    
        // 기존에 추가된 페이지번호를 삭제합니다
        while (paginationEl.hasChildNodes()) {
            paginationEl.removeChild (paginationEl.lastChild);
        }
    
        for (i=1; i<=pagination.last; i++) {
            let el = document.createElement('a');
            el.href = "#";
            el.innerHTML = i;
    
            if (i===pagination.current) {
                el.className = 'on';
            } else {
                el.onclick = (function(i) {
                    return function() {
                        pagination.gotoPage(i);
                    }
                })(i);
            }
    
            fragment.appendChild(el);
        }
        paginationEl.appendChild(fragment);
    }

    const displayInfowindow = (marker, title) => {

        let content = '<div style="padding:5px;z-index:1;">' + title + '</div>';
    
        if (infowindow) {
            infowindow.setContent(content);
            infowindow.open(map, marker);
        }
    }

    const removeAllChildNods = (el) => {   
        while (el.hasChildNodes()) {
            el.removeChild (el.lastChild);
        }
    }
    
    // -------------------------------------------------------

    const onClickMoveToMypage = () => {
        router.push("../mypage")
    }

    const onClickMoveToLogin = () => {
        router.push("../login")
    }

    const onClickMoveToSignup = () => {
        router.push("../signup")
    }

    const onClickReload = () => {
        window.location.reload();
    }

    const onChangeKeyword = (event) => {
        setKeyword(event.target.value)
        if(event.target.value !== ""){
            setKwError("")
        }
    }

    

    return (
        <>
            <Head>
                <script
                    type="text/javascript" 
                    src="//dapi.kakao.com/v2/maps/sdk.js?appkey=874eea7b48b7810e4c254737d3892e8f&libraries=services,clusterer,drawing,geometry"
                    strategy ="lazyOnload"
                ></script>
            </Head>
           
            <MapUI
                onClickMoveToMypage = {onClickMoveToMypage}
                onClickMoveToLogin = {onClickMoveToLogin}
                onClickMoveToSignup = {onClickMoveToSignup}
                onClickReload = {onClickReload}
                onChangeKeyword = {onChangeKeyword}
                keyword = {keyword}
                searchPlaces = {searchPlaces}
            />
        </>
        
    )
}