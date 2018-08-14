import React from 'react'; 

const icons = {
  severe: 'report', 
  deprecated: 'warning', 
  csp: 'security', 
  fp: 'important_devices', 
  redundant: 'done_all', 
  conflicting: 'compare_arrows', 
  hasBod: 'description',
  internal: 'storage',
  external: 'public',
  cookies: 'vpn_key',
  setCookie: 'add_circle_outline',
  connected: 'autorenew'
}

const Icon = ({flag}) => (
    <i className="material-icons">
      {icons[flag]}
    </i>
)

export default Icon;