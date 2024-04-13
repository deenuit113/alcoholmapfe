import styled from "@emotion/styled";

export const Wrapper = styled.div`
    position: relative;
    width: 100%;
    height: 100vh;
    margin: 10 10 10 10px;
    padding-top: 80px;
    padding-bottom: 100px;
    padding-left: 50px;
    padding-right: 50px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border: 1px solid gray;
    border-radius: 30px;
    box-shadow: 0px 0px 10px gray;
    background-color: #f1ffff;
    overflow-x: hidden;

    @media all and (min-width: 359px) and (max-width: 799px) {
        // 모바일 세로
        padding-top: 30px;
        padding-left: 0px;
        padding-right: 0px;
        padding-bottom: 50px;
        overflow: hidden;
        overflow-x: hidden;
        border: none;
        border-radius: 0px;
    }
`;

export const GBHeader = styled.header`
    @media all and (min-width: 359px) and (max-width: 799px) {
        width: 60%;
        height: 10%;
        display: flex;
        flex-direction: column;
        justify-content: center;
    }
`

export const Logo = styled.img`
    cursor: pointer
`

export const Title = styled.h1`
    font-size: 20px;
    margin-bottom: 10px;
`

export const SearchIdInput = styled.input`
    width: 80%;
    margin-bottom: 30px;
    border: 1px solid gray;
    border-radius: 20px;
    font-size: 25px;
    padding: 5px 10px 5px 10px;
    
`

export const ListWrapper = styled.div`
    width: 90%;
    height: 95%;
    border: 3px solid #b7f0b1;
    padding: 20px 15px 20px 15px;;
    border-radius: 30px;
    overflow-y: scroll;

    &::-webkit-scrollbar {
        width: 12px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 6px;
        transition: background-color 0.3s ease;
    }

    &::-webkit-scrollbar-thumb:hover {
        background-color: #555;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 8px;
    }

    &:hover {
        &::-webkit-scrollbar {
            width: 12px;
        }
    }

    #LoadingIcon{
        margin-top: 20px;
        font-size: 30px;
    }
`

export const FollowListUl = styled.ul`
`

export const FollowInfo = styled.li`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0px 10px 0px;
    border-bottom: 1px solid gray;
    height: 100px;
    @media all and (min-width: 359px) and (max-width: 799px) {
        // 모바일 세로
        height: 80px;
    }
`

export const UserInfoWrapper = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`

export const ProfileWrapper = styled.div`
    width: 60px;
    height: 60px;
    margin-left: 10px;
    margin-right: 10px;
    border: 1px solid gray;
    border-radius: 50%;
`

export const ProfileImg = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: contain;
`

export const UserName = styled.span`
    float: right;
    @media all and (min-width: 359px) and (max-width: 799px) {
        // 모바일 세로
        font-size: 15px;
    }
`

export const GoToUserInfoButton = styled.button`
    background-color: #47C83E;
    border-radius: 20px;
    border: none;
    padding: 5px 10px 5px 10px;
    font-weight: bold;

    :hover {
        cursor: pointer;
    }
`

export const LoadingSkeletonUl = styled.ul`
    height: 30px;
    min-height: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`