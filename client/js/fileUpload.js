import * as FilePond from 'filepond';
import 'filepond/dist/filepond.min.css';
import FilePondPluginImageResize from 'filepond-plugin-image-resize';
import FilePondPluginImagePreview from 'filepond-plugin-image-preview';
// import FilePondPluginFileEncode from 'filepond-plugin-file-encode';
import 'filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css';
// const rootStyles = window.getComputedStyle(document.documentElement)

// if (rootStyles.getPropertyValue('--book-cover-width-large') != null && rootStyles.getPropertyValue('--book-cover-width-large') !== '') {
//   ready()
// } else {
//   document.getElementById('main-css').addEventListener('load', ready)
// }

// function ready() {
  // const coverWidth = parseFloat(rootStyles.getPropertyValue('--book-cover-width-large'))
  // const coverAspectRatio = parseFloat(rootStyles.getPropertyValue('--book-cover-aspect-ratio'))
  // const coverHeight = coverWidth / coverAspectRatio
  FilePond.registerPlugin(
    FilePondPluginImagePreview,
    FilePondPluginImageResize,
    // FilePondPluginFileEncode
  )

    // FilePondPluginFileEncode,

  FilePond.setOptions({
        server: 'http://localhost:5000/api/users/image',
    stylePanelAspectRatio: 150 / 100,
// coverAspectRatio
    imageResizeTargetWidth: 100,
// coverWidth
    imageResizeTargetHeight: 150
// coverHeight
  })
  
  FilePond.parse(document.body)
// }
export default FilePond;