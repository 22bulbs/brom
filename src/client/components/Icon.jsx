import React from 'react'; 

const icons = {
  severe: 'report', 
  deprecated: 'warning', 
  csp: 'security', 
  fp: 'important_devices', 
  redundant: 'done_all', 
  conflicting: 'compare_arrows', 
  hasBody: 'description',
  internal: 'storage',
  external: 'public',
  cookies: 'vpn_key',
  setCookie: 'add_circle_outline',
  connected: 'autorenew'
}

const fullText = {
  severe: 'Potential Vulnerability', 
  deprecated: 'Deprecated Headers', 
  csp: 'Content Security Policy Present', 
  fp: 'Feature Policy Present', 
  redundant: 'Redundant Headers', 
  conflicting: 'Conflicting Headers', 
  hasBody: 'Response Has Body',
  internal: 'Internal Destination',
  external: 'External Destination',
  cookies: '',
  setCookie: '',
  connected: ''
}

const Icon = ({flag, tooltip}) => (
  <span className="icon">
  {tooltip && <div className="tooltip">
    {fullText[flag]}
  </div>}
    <i className="material-icons">
      {icons[flag]}
    </i>
  </span>
)

export default Icon;