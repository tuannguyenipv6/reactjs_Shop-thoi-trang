import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import { VALUE_RATING } from '../../constants';
import { IEvaluate } from '../../datatypes';

// const valueRating = [20, 40, 60, 80, 100] 

interface IRatingsStarProps {
    evaluates?: IEvaluate[];
    star?: number
}

function RatingsStar({evaluates, star}: IRatingsStarProps) {

    let evaluation = 0;
    if(star) {
        evaluation = star;
    } else if (evaluates) {
        evaluation = evaluates.reduce((accumulator, currentValue) => accumulator + currentValue.evaluate, 0) / evaluates.length
    }

    return (<div style={{color: '#ffd52e'}}>
        {
            VALUE_RATING.map((key, i) => {
                if(evaluation >= key) {
                    return <FaStar key={i} />
                }else {
                    if(evaluation >= key - 10) {
                        return <FaStarHalfAlt key={i} />
                    }
                    return <FaRegStar key={i} />
                }
            })
        }
    </div>)
}

export default RatingsStar;