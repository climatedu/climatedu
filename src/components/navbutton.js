/** @jsx jsx */
import { Box, Flex, NavLink, Image, jsx } from 'theme-ui'
import { Component } from 'react'
import React from 'react'
import { BsCaretDownFill, BsCaretUpFill } from 'react-icons/bs'

class NavButton extends Component {
  constructor(props) {
    super(props);
    const {loc,text,icon,active,dropdown} = props;
    this.loc = loc;
    this.text = text;
    this.active = active;
    this.icon = icon;
    this.dropdown = dropdown;
    this.state = {open:false};
    this.expand = ()=>this.setState({open:true});
    this.collapse = ()=>this.setState({open:false});
  }
  render() {
    return (
      <Box
        sx={{
          padding: '4px 10px',
          margin: '0 auto',
          borderRadius: this.state.open?'10px 10px 0 0':'10px',
          background: this.active||this.state.open?'#dfd':'inherit'
        }}
        onBlur={this.collapse}
      >
        <Flex
          sx={{
            alignItems:'center',
            justifyContent:'center'
          }}
        >
          <NavLink
            href={this.loc}
          >
            {this.text}
            {this.icon&&jsx(this.icon,{
              sx:{
                top:'0.1em',
                position:'relative'
              }
            })}
          </NavLink>
          {this.dropdown?(this.state.open?(
            <BsCaretUpFill
              onClick={()=>this.collapse()}
              sx={{
                paddingLeft:'5px'
              }}
            />
          ):(
            <BsCaretDownFill
              onClick={()=>this.expand()}
              sx={{
                paddingLeft:'5px',
                paddingTop:'0.25em'
              }}
            />
          )):undefined}
        </Flex>
        {this.dropdown&&this.state.open&&(
          <Box
            sx={{
              position:'absolute',
              padding: '2px 8px',
              borderRadius: '0 10px 10px 10px',
              background: '#dfd',
              marginLeft:'-10px',
              zIndex: 10
            }}
          >
          {this.dropdown.map(({location,text})=>{
            return (
              <Box>
                <NavLink href={location}>
                  {text}
                </NavLink>
              </Box>)
          })}
          </Box>
        )}
      </Box>
    )
  }
}

export default NavButton