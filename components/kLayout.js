import React from 'react'
import styles from "../styles/start.module.css" 
import UserMenu from "./UserMenu"
import configData from '../kConfig_consts.json'


class KLayout extends React.Component
{
    constructor(props)
    {
        super(props);
    }

    render()
    {
       const containerClasses = "container";
       
       const rowClasses = "row";
       const sideClasses = "col-sm-12 col-md-2 "+ styles.side;
       const floorClasses = "col-sm-12 col-md-10 "+ styles.floor;
       let menuItems = [];
       return( 
        <div className={containerClasses}>
              <div className={rowClasses}>                  
                  <div className={floorClasses}>
                    
                      {this.props.children}
                  </div>
                  <div className={sideClasses}>
                        <UserMenu menuItems= {configData.SIDE_MENU_OPTIONS} ></UserMenu>
                      this is the side
                  </div>
              </div>
        </div>)
    }
}

export default KLayout