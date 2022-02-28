import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom"
import {fetchX} from "../util";

interface PropsTest extends RouteComponentProps { }
interface SateTest extends RouteComponentProps { }

class Test extends React.Component<PropsTest, SateTest> {
// import { useParams } from "react-router-dom"
    // const id = useParams()
    // const id = this.props.match.params.id
    // this.props.location.search
    onBtn = () => {
        let obj = {
            // group: 'groups/2'
            subGroups: ["subGroups/3", "subGroups/4"]
        }
        fetchX('/api/groups/1', {
            method: 'PATCH',
            body: JSON.stringify(obj)
        }).then( res => {
            console.log(res)
        })
    }

    render() {
        return <div>
            <button type='button' onClick={this.onBtn}>btn</button>
        </div>
    }
}
export default withRouter(Test)