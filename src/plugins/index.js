import { Swipe, SwipeItem ,Button} from 'vant';
import { Popup } from 'vant';

let plugins=[
    Swipe, SwipeItem ,Button,Popup
]
export default function getVant(app){
    plugins.forEach((item)=>{
        return app.use(item)
    })
}