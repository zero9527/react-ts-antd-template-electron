import * as React from 'react';
import styles from './electron-ipcRender.scss';
import { Button } from 'antd';

const ipcRenderer = window.ipcRenderer;

interface IProps {
  [prop: string]: any
}

function ElectronIpcRender(props: IProps) {

  const showDialog = () => {
    if (ipcRenderer) {
      ipcRenderer.send('show-dialog', '哈哈哈哈！！！！');
      ipcRenderer.on('show-dialog-done', (event: any, msg: any) => {
        console.log(event, msg);
      })
    } else {
      alert('浏览器的弹窗：呵呵呵呵！！！');
    }
  }

  const showNewWindow = () => {
    if (ipcRenderer) {
      ipcRenderer.send('show-newWindow', Date.now());
    }
  }
  
  return (
    <section className={styles.ElectronIpcRender}>
      <p>浏览器使用alert, Electron使用dialog.showMessageBox</p>
      <Button onClick={showDialog}>弹窗！</Button>
      <p>小窗口</p>
      <Button onClick={showNewWindow}>小窗口</Button>
    </section>
  );
}

export default ElectronIpcRender;
