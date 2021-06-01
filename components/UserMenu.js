
 import React from 'react'
 import styles from "../styles/UserMenu.module.css"
//import { Nav, NavItem, Button, Form } from 'reactstrap'
export class UserMenu extends React.Component {
    constructor(props) {
      super(props);

      this.menuItems = props.menuItems;
    }
  
    render()
    {
          let menuItems = [];
          this.menuItems.forEach((d,i)=>{
                                 console.log(d,i);
                                 menuItems.push((<li key={i}>
                                                     <a href={d.target}>{d.name}</a>
                                                </li> ))    ;
                            });

           return (
                <ul className={styles.menu}>
                    {menuItems}
                </ul>

           );
    }
  }

  export default UserMenu;