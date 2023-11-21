import { FC } from 'react';

interface IReview {
    description: string;
    user_id: any;
    rate: number;
    foodId: any;
}

const ReviewCard: FC<IReview> = ({ description, user_id, rate, foodId }) => {
    return (
        <div className="item" style={{ height: '100%' }}>
            <div
                className="box"
                style={{
                    display: 'flex',
                    height: '100%',
                    justifyContent: 'space-around',
                    flexDirection: 'column'
                }}
            >
                <div className="detail-box">
                    <p>{description}</p>
                    <h6>
                        {user_id.firstName} {user_id.lastName}
                    </h6>
                    <p>
                        {foodId.foodName || 'Food Name'} {rate}
                    </p>
                </div>
                <div className="img-box">
                    <img src="/images/client1.jpg" alt="" className="box-img" />
                </div>
            </div>
        </div>
    );
};

export default ReviewCard;
