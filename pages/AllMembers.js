  import React from 'react'
 class AllMembers extends React.Component 
 {
    constructor(props)
    {
        super(props);

        let map = {};
       // props.emailListMembers.forEach(element=>map[element.id] = element );       
      
        this.state = {
        listMembers: props.emailListMembers || null,
        error: props.error || null,
        map
        }

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



    render(){
        return(
            <div>
                all members loaded
            </div>
        )
    }
 }

 
  export default AllMembers;