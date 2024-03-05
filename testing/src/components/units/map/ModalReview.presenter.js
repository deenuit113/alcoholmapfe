import React from 'react';
import * as S from './ModalReview.styles'

const ModalReviewUI = (props) => {
    return(
        <S.ReviewDataWrapper id = "ReviewDataWrapper">
            <S.ReviewListUl>
                {props.data.map((item, index) => (
                    <li key={index}>
                        <div>UserId: {item.userId}</div>
                        <div>Review: {item.review}</div>
                    </li>
                ))}
            </S.ReviewListUl>
            {props.loading && <div>Loading...</div>}
        </S.ReviewDataWrapper>
    );
};

export default ModalReviewUI;