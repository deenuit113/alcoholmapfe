import { useState, useEffect } from "react";

export default function Login() {
    const [keyword, setKeyword] = useState("술집");
    const [kwError, setKwError] = useState("");
    const [container, setContainer] = useState(null);
    const [options, setOptions] = useState(null);
    const [map, setMap] = useState(null);
    const [ps, setPs] = useState(null);
    const [infowindow, setInfowindow] = useState(null);
    const [markers, setMarkers] = useState([]);
    const [userPosition, setUserPosition] = useState(null);
    const [selectedPlace, setSelectedPlace] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const script = document.createElement("script");
        script.async = true;
        script.src =
            "//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=874eea7b48b7810e4c254737d3892e8f&libraries=services";
    
        script.onload = () => {
            console.log('Kakao Maps SDK loaded successfully!');
            window.kakao.maps.load(() => {
                fetchData();
            });
        };
        document.head.appendChild(script);
    
        // Cleanup function to remove the script element when the component unmounts
        return () => {
            //document.head.removeChild(script);
        };
    }, [ps]);

    const getUserPosition = async () => {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(
                (position) => resolve(position),
                (error) => reject(error)
            );
        });
    };

    const fetchData = async () => {
        try {
            const upos = await getUserPosition();
            setUserPosition(upos);
            console.log('User Position:', userPosition);

            const options = {
                center: new window.kakao.maps.LatLng(
                    userPosition.coords.latitude,
                    userPosition.coords.longitude
                ),
                level: 2,
            };
            console.log(options);

            setOptions(options);

            const newMap = map || new window.kakao.maps.Map(
                document.getElementById('map'),
                options
            );
            setMap(newMap);

            const newPs = ps || new window.kakao.maps.services.Places();
            setPs(newPs);

            if (!infowindow) {
                const newInfowindow = new window.kakao.maps.InfoWindow({
                    map: newMap,
                    position: options.center,
                    content: '',
                });
                setInfowindow(newInfowindow);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const addMarker = () => {
        const marker = new window.kakao.maps.Marker({
            map: map,
            position: new window.kakao.maps.LatLng(userPosition.coords.latitude, userPosition.coords.longitude)
        });
        setMarkers((prevMarkers) => [...prevMarkers, marker]);
    }

    const removeMarker = () => {
        setMarkers((prevMarkers) => {
            const lastMarker = prevMarkers.pop();
            if (lastMarker) {
                lastMarker.setMap(null);
            }
            return [...prevMarkers];
        });
    }

    const divStyle = {
        width: '600px',
        height: '500px',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #000',
    };

    return (
        <>
            <div id="map" style={divStyle}>
                {/* 이곳에 내용을 추가할 수 있습니다. */}
            </div>
            <button onClick={addMarker}>마커 추가</button>
            <button onClick={removeMarker}>마커 삭제</button>
        </>
    );
}