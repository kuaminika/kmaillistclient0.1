import React from 'react'
import configData from '../kConfig.json'
import {KList} from '../components/kList'
//import { FontAwesomeIcon } from '@fortawesome/fontawesome-free'
import { faMinusCircle,faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import kCourrier from "../KLIBJS/KCourrier"
import AsyncData from '../components/async-data'
 class AllMembers extends React.Component 
 {
    constructor(props)
    {
        super(props); 

        let map = {};
        if(props.emailListMembers)
            props.emailListMembers.forEach(element=>map[element.id] = element );       
      
        this.state = {
            listMembers: props.emailListMembers || null,
            error: props.error || null,
            map
        }

        console.log(this.state);

    }


     updateMemberList(memberLists)
    {
        let map = {};
        let newState = Object.assign({},this.state);

        //todo: fix icons
        

        newState.listMembers = memberLists || newState.listMembers;          
        newState.listMembers.forEach(element=>map[element.id] = element );       
        newState.map = map; 
        console.log("setting new state",newState)
        this.setState(newState);
    }

    removeFromList()
    {}

    render(){
        return(
        <React.Fragment>
            <div>
                all members loaded
            </div>
             <KList title="Test" items={this.state.listMembers} error={this.state.error} logMode={false}>
        
                 {
                    member=>
                    (
                        <div key={"member-"+member.id+"-wrap"} >
                            <div  key={"member-"+member.id+"-join-wrap"} className="d-flex w-100 justify-content-between">
                                <h5 key={"member-"+member.id+"-name"}  className="mb-1" >{member.name}</h5>
                                <small key={"member-"+member.id+"-join"}  >join date:{member.dateAdded}</small>
                            </div>
                            <div key={"member-"+member.id+"-menu-wrap"}  className="d-flex w-100 justify-content-between">
                                <div key={"member-"+member.id+"-email"} ><b>email:</b>{member.email}  </div>
                                <div  key={"member-"+member.id+"-id"} className="alert  p-1 alert-warning d-flex justify-content-between"><b>id:</b>{member.id} 
                                  <div  key={"member-"+member.id+"-remove"} data-member-id={member.id} onClick={this.removeFromList.bind(this)} className="btn btn-sm btn-danger m-1"> <i key={"member-"+member.id+"-remove-icon"}  className="fa fa-minus-circle"></i> <FontAwesomeIcon icon={faMinusCircle} /></div>
                                  <div key={"member-"+member.id+"-edit"}  className="btn btn-sm btn-primary m-auto p-auto"><FontAwesomeIcon key={"member-"+member.id+"-edit-icon"}  icon={faEdit}/></div>
                                </div>
                            </div>
                        </div>
                    )                     
                 }
            </KList>
            </React.Fragment>
        )
    }
 }

 
  export default AllMembers;

  export async  function getStaticProps(context) {
  const emailListMembers  = await AsyncData.getListMembers();
  

  return {
    props: {emailListMembers}, // will be passed to the page component as props
  }
}