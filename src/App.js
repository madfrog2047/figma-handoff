import React from 'react'
import Entry from 'components/Entry'
import Main from 'components/Main'
import Header from 'components/header'
import 'assets/base.scss'
import './app.scss'

class App extends React.Component {
  constructor(props) {
    super(props)
    let data, entryVisible
    const { FILE_DATA } = window
    if (FILE_DATA) {
      data = FILE_DATA
      entryVisible = false
    } else {
      entryVisible = true
    }
    this.state = {
      isMock: false,
      entryVisible,
      data,
      images: {},
      names: {}
    }
  }
  handleDataGot = (fileData, components, styles, imagesData) => {
    this.setState({
      entryVisible: false,
      data: fileData,
      components,
      styles,
      images: imagesData,
      isMock: !imagesData
    })
  }
  getNames = (pageName, frameName) => {
    const { data } = this.state
    this.setState({
      names: {
        documentName: data.name,
        pageName: pageName || data.document.children[0].name,
        frameName: frameName || data.document.children[0].children[0].name
      }
    })
  }
  render () {
    const { entryVisible, isMock, data, components, styles, images, names } = this.state
    return (
      <div className="app-container">
        <Header {...names} data={data}/>
        {
          entryVisible ?
          <Entry
            onGotData={this.handleDataGot}
          /> :
          <Main
            isMock={isMock}
            data={data}
            components={components}
            styles={styles}
            images={images}
            onNamesChange={this.getNames}
          />
        }
      </div>
    )
  }
}

export default App
