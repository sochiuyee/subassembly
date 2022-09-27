import React from 'react';
import Button, {ButtonSize, ButtonType} from './components/Button/button';
import './styles/index.scss'
import Alert, {AlertType} from './components/Alert/alert';
import Icon from './components/Icon/icon';
import {fas} from '@fortawesome/free-solid-svg-icons'
import {library} from '@fortawesome/fontawesome-svg-core'
library.add(fas)

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Button>default</Button>
        <Button btnType={ButtonType.Danger} size={ButtonSize.Large}>danger</Button>
        <Button btnType={ButtonType.Link} size={ButtonSize.Large} href="www.baidu.com">测试Button组件Link</Button>
        <Button disabled={true} btnType={ButtonType.Danger} size={ButtonSize.Small}>测试组件button</Button>
        <Alert message='Error Text' description='this is alert  error description' closeText='关闭' type={AlertType.Danger}></Alert>
        <Alert message='Warning Text' description='this is alert  warning description' type={AlertType.Warning}></Alert>
        <Alert message='Default Text' description='this is alert  default description'></Alert>
        <Alert className='alert-wrap' style={{'height': '200px'}} message='Default Text' description='this is alert  default description' closable={false}></Alert>
        <Alert message='Default Text' description='this is alert  default description' closeText={
          <div>
            这是一个关闭文案
          </div>
        } onClose={() => window.alert('close')}></Alert>
        <Icon theme='danger' size='10x' icon='coffee'></Icon>
      </header>
    </div>
  );
}

export default App;
