 import React from 'react'
 import styles from "../styles/start.module.css" 
import configData from '../kConfig_consts.json'
 class Start extends React.Component 
 {
     render(){
       const containerClasses = "container";
       
       const rowClasses = "row";
       const sideClasses = "col-sm-12 col-md-2 "+ styles.side;
       const floorClasses = "col-sm-12 col-md-10 "+ styles.floor;
       let menuItems = [];
       return( 
        <div className={containerClasses}>
              <div className={rowClasses}>                  
                  <div className={floorClasses}>
                      this is the floor
                  </div>
                  <div className={sideClasses}>
                       {
                         configData.SIDE_MENU_OPTIONS.forEach((d,i)=>{
                                 console.log(d,i);
                         menuItems.push((<div key={i}>{d.name}</div> ))    ;
                            })
                        }
                        {menuItems} 
                      this is the side
                  </div>
              </div>
        </div>)

     }
 }

 export default Start;