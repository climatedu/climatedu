/** @jsx jsx */
import { jsx } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'

const Link = props => {
  if (props.externalLink) {
    return <a href={props.to}>{props.text}</a>
  }
  return (
    <GatsbyLink
      {...props}
      activeClassName='active'
      sx={{
        color: 'inherit',
        '&.active': {
          color: 'primary',
        },
      }}
    />
  )
}

export default Link
