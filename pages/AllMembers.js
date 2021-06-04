import React from 'react'
import configData from '../kConfig.json'
import {AddMemberForm} from '../components/AddMemberForm'
import {KList} from '../components/kList'
import { faMinusCircle,faEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import kCourrier from "../KLIBJS/KCourrier"
import AsyncData from '../components/async-data'
 class AllMembers extends React.Component 
 {
    constructor(props)
    {
        super(props); 

        this.addFormElement = React.createRef();
        let map = {};
        if(props.listDetails.contents)
            props.listDetails.contents.forEach(element=>map[element.id] = element );       
      
        this.state = {
            listMembers: props.listDetails.contents || null,
            error: props.error || null,
            listId:props.listDetails.id,
            map
        }

        console.log(this.state);

    }


     updateMemberList(memberLists)
    {
        let map = {};
        let newState = Object.assign({},this.state);
      

        newState.listMembers = memberLists || newState.listMembers;          
        newState.listMembers.forEach(element=>map[element.id] = element );       
        newState.map = map; 
        console.log("setting new state",newState)
        this.setState(newState);
    }

  addToList(event)
  { 
      console.log(this.state);
      console.log(this.props);
      console.log(this.addFormElement.current.state);

      const newMember = this.addFormElement.current.state;
      kCourrier.setHTTPs(true).post( configData.SUBSCRIBER_ADD_TO_LIST,newMember)
      .then((response)=>{
        console.log("it finished",response)
        return response.json();
      })
      .then(this.updateMemberList.bind(this))   
      .then(this.closeForm.bind(this))   
      .catch(console.error);
  }
    removeFromList()
    {

         console.log(this);

      
      const elementClickedOn = event.target;
      const id = elementClickedOn.getAttribute("data-member-id");
      let chosenMember = this.state.map[id];
     
      kCourrier.post( configData.SUBSCRIBER_REMOVE_FROM_LIST,chosenMember)
      .then((response)=>{
        console.log("it finished",response)
        return response.json();
      })
      .then(this.updateMemberList.bind(this))        
      .then(this.render.bind(this))
      .catch(console.error);
       console.log(chosenMember);
      console.log(event.target);

    }

  closeForm()
  {
      this.addFormElement.current.onCloseFormClicked();
  }
    render(){
        return(
        <React.Fragment>
            <div>
                all members loaded
            </div>
            
            <AddMemberForm  id="addMemberForm" key="addForm" listId={this.state.listId} ref= {this.addFormElement}  onSubmit={this.addToList.bind(this) } />
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
      console.log("context:");
      console.log(context);
  const listDetails  = await AsyncData.getListMembers();
  

  return {
    props: {listDetails}, // will be passed to the page component as props
  }
}