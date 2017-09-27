import InfoHelperDemo from './InfoHelperDemo';
import './style.css'
import React from 'react'
import { render } from 'react-dom'
import DataTableDemo from './DataTableDemo/index.js'
import {withUpsert, withQuery} from '../../src'
import VectorEditorDemo from './VectorEditorDemo/index.js'
import CollapsibleCardDemo from './CollapsibleCardDemo/index.js'
import LoadingDemo from './LoadingDemo/index.js'
import DownloadLinkDemo from './DownloadLinkDemo/index.js'
import FormComponentsDemo from './FormComponentsDemo'
import FontIconsDemo from './FontIconsDemo'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store';
import Perf from 'react-addons-perf'

const demos = {
  VectorEditor: {
    demo: VectorEditorDemo,
    url: 'https://github.com/TeselaGen/teselagen-react-components/blob/master/demo/src/VectorEditorDemo/index.js'
  },
  DataTable: {
    demo: DataTableDemo,
    url: 'https://github.com/TeselaGen/teselagen-react-components/blob/master/demo/src/DataTableDemo/index.js'
  },
  InfoHelper: {
    demo: InfoHelperDemo,
    url: 'https://github.com/TeselaGen/teselagen-react-components/blob/master/demo/src/InfoHelperDemo/index.js'
  },
  CollapsibleCard: {
    demo: CollapsibleCardDemo,
    url: 'https://github.com/TeselaGen/teselagen-react-components/blob/master/demo/src/CollapsibleCardDemo/index.js'
  },
  Loading: {
    demo: LoadingDemo,
    url: 'https://github.com/TeselaGen/teselagen-react-components/blob/master/demo/src/LoadingDemo/index.js'
  },
  DownloadLink: {
    demo: DownloadLinkDemo,
    url: 'https://github.com/TeselaGen/teselagen-react-components/blob/master/demo/src/DownloadLinkDemo/index.js'
  },
  FormComponents: {
    demo: FormComponentsDemo,
    url: 'https://github.com/TeselaGen/teselagen-react-components/blob/master/demo/src/FormComponentsDemo/index.js'
  },
  fonticons: {
    demo: FontIconsDemo,
    url: 'https://github.com/TeselaGen/teselagen-react-components/blob/master/demo/src/FontIconsDemo/index.js'
  },
}

function DemoComponentWrapper({demo: Demo, url}) {
    return () => {
      return <div>
        <br></br>
        <Demo></Demo>
        <br/>
        <br/>
        <a href={url}> See demo source! </a>
      </div>
    }
}

// Make the Perf object global for debugging purposes.
window.Perf = Perf

const Demo = () => {
  return (
    <div>
      <Provider store={store}>
        <Router>
          <div style={{margin: 15}}>
            <Route path="/" component={HomePage} />
            {
              Object.keys(demos).map(function (key, index) {
                return <Route key={index} path={`/${key}`} url={demos[key].url} component={DemoComponentWrapper(demos[key])} />
              })
            }
          </div>
        </Router>
      </Provider>
    </div>
  )
}

render(<Demo />, document.querySelector('#demo'))

function HomePage() {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {
        Object.keys(demos).map(function (name, index) {
          return <Link
            key={index}
              to={`/${name}`}
              style={{ color: 'inherit', textDecoration: 'none' }}
            >
              <div style={  {borderLeft: index !== 0 && '2px solid grey'}} className={'pt-popover-dismiss pt-menu-item'}>
                {name} demo
              </div>

            </Link>
        })
      }
    </div>
  )
}
