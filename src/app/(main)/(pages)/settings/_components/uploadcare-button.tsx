'use client'
import { FileUploaderRegular } from '@uploadcare/react-uploader/next';
import '@uploadcare/react-uploader/core.css';


type Props = {
    onUpload? : any
}

const UploadcareButton = (props: Props) => {
  return (
    <div>
        <FileUploaderRegular
         sourceList="local, url, camera, dropbox"
         classNameUploader="uc-dark uc-red"
         pubkey="51af3f114d436ef90157"
      />
    </div>
  )
}

export default UploadcareButton