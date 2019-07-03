import React, { Component } from 'react'
import PropTypes from 'prop-types'

import { Upload, Icon, Button, Progress,Checkbox, Modal, Spin, Radio, message } from 'antd'

import request from 'superagent'
import SparkMD5 from 'spark-md5'

const confirm = Modal.confirm
const Dragger = Upload.Dragger

class FileUpload extends Component {
  constructor(props) {
    super(props)
    this.state = {
      preUploading:false,   //预处理
      chunksSize:0,   // 上传文件分块的总个数
      currentChunks:0,  // 当前上传的队列个数 当前还剩下多少个分片没上传
      uploadPercent:-1,  // 上传率
      preUploadPercent:-1, // 预处理率  
      uploadRequest:false, // 上传请求，即进行第一个过程中
      uploaded:false, // 表示文件是否上传成功
      uploading:false, // 上传中状态
    }
  }
  showConfirm = () => {
    const _this = this
    confirm({
      title: '是否提交上传?',
      content: '点击确认进行提交',
      onOk() {
        _this.preUpload()
      },
      onCancel() { },
    })
  }
  
  preUpload = (res)=>{
   // requestUrl,返回可以上传的分片队列
   //...
   let uploadList = res.body.Chunks.filter((value)=>{
    return value.status === 'Pending'
  })

  // 从返回结果中获取当前还有多少个分片没传
  let currentChunks = res.body.Total - res.body.Uploaded

  // 获得上传进度
  let uploadPercent = Number(((this.state.chunksSize - currentChunks) /this.state.chunksSize * 100).toFixed(2))      
  // 上传之前，先判断文件是否已经上传成功
  if(uploadPercent === 100){
    message.success('上传成功')
    this.setState({
      uploaded:true,    // 让进度条消失
      uploading:false
    })
  }else{
    this.setState({
      uploaded:false,
      uploading:true    
    })
  }

  this.setState({
    uploadRequest:false,    // 上传请求成功
    currentChunks,
    uploadPercent
  })
  //进行分片上传
  this.handlePartUpload(uploadList)

  };

 
  handlePartUpload = (uploadList)=>{
    let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice  
    // 遍历uploadList
    uploadList.forEach((value)=>{
      // 取出每个分片里的基本属性
      let {fileMd5,chunkMd5,chunk,start,end} = value
      let formData = new FormData(),
          //新建一个Blob对象，将对应分片的arrayBuffer加入Blob中
          blob = new Blob([this.state.arrayBufferData[chunk-1].currentBuffer],{type: 'application/octet-stream'}),
          // 上传的参数
          params = `fileMd5=${fileMd5}&chunkMd5=${chunkMd5}&chunk=${chunk}&start=${start}&end=${end}&chunks=${this.state.arrayBufferData.length}`
      
      // 将生成blob塞入到formdata中传入服务端
      formData.append('chunk', blob, chunkMd5)
      
      request
        .post(`http://X.X.X.X/api/upload_file_part?${params}`)
        .send(formData)
        .end((err,res)=>{
          if(res.body.Code === 200){
            let currentChunks = this.state.currentChunks
            --currentChunks
            // 计算上传进度
            let uploadPercent = Number(((this.state.chunksSize - currentChunks) /this.state.chunksSize * 100).toFixed(2))
            this.setState({
              currentChunks,  // 同步当前所需上传的chunks
              uploadPercent,
              uploading:true
            })
            if(currentChunks ===0){
              // 调用验证api
              this.checkUpload()
              message.success('上传成功')
              this.setState({
                uploading:false,    // 让进度条消失
                uploaded:true
              })
            }
          }
        })
        
    })
  }

  
  render() {
    const {preUploading,uploadPercent,preUploadPercent,uploadRequest,uploaded,uploading} = this.state
    const _this = this
    const uploadProp = {
      onRemove: (file) => {
        this.setState(({ fileList }) => {
          const index = fileList.indexOf(file)
          const newFileList = fileList.slice()
          newFileList.splice(index, 1)
          return {
            fileList: newFileList,
          }
        })
      },
      beforeUpload: (file, fileList) => {
        console.log('file===', file)
        // 首先清除一下各种上传的状态
        this.setState({
          uploaded:false,   // 上传成功
          uploading:false,  // 上传中
          uploadRequest:false   // 上传预处理
        })
        // 兼容性的处理
        let blobSlice = File.prototype.slice || File.prototype.mozSlice || File.prototype.webkitSlice;
        const chunkSize = 1024*1024*5;                            // 切片每次5M
        const chunks = Math.ceil(file.size / chunkSize);
        let currentChunk = 0; // 当前上传的chunk
        const spark = new SparkMD5.ArrayBuffer();
          // 对arrayBuffer数据进行md5加密，产生一个md5字符串
        const chunkFileReader = new FileReader();  // 用于计算出每个chunkMd5
        const totalFileReader = new FileReader(); // 用于计算出总文件的fileMd5
          
        let params = {chunks: [], file: {}};   // 用于上传所有分片的md5信息
        const arrayBufferData = [];             // 用于存储每个chunk的arrayBuffer对象,用于分片上传使用
        params.file.fileName = file.name;
        params.file.fileSize = file.size;

        totalFileReader.readAsArrayBuffer(file);
        totalFileReader.onload = function(e){
            // 对整个totalFile生成md5
            spark.append(e.target.result)
            params.file.fileMd5 = spark.end() // 计算整个文件的fileMd5
          };
        // chunkFileReader.readAsArrayBuffer(spark); 
        chunkFileReader.onload= function (e) {
          // 对每一片分片进行md5加密
          spark.append(e.target.result)
          // 每一个分片需要包含的信息
          let obj = {
            chunk:currentChunk + 1,
            start:currentChunk * chunkSize, // 计算分片的起始位置
            end:((currentChunk * chunkSize + chunkSize) >= file.size) ? file.size : currentChunk * chunkSize + chunkSize, // 计算分片的结束位置
            chunkMd5:spark.end(),
            chunks
          };
          // 每一次分片onload,currentChunk都需要增加，以便来计算分片的次数
          currentChunk++;          
          params.chunks.push(obj)
          // 将每一块分片的arrayBuffer存储起来，用来partUpload
          let tmp = {
            chunk:obj.chunk,
            currentBuffer:e.target.result
          }
          arrayBufferData.push(tmp)
          
          if (currentChunk < chunks) {
            // 当前切片总数没有达到总数时
            loadNext()
            
            // 计算预处理进度
            _this.setState({
              preUploading:true,
              preUploadPercent:Number((currentChunk / chunks * 100).toFixed(2))
            })
          } else {
            //记录所有chunks的长度
            params.file.fileChunks = params.chunks.length  
            // 表示预处理结束，将上传的参数，arrayBuffer的数据存储起来
            _this.setState({
              preUploading:false,
              uploadParams:params,
              arrayBufferData,
              chunksSize:chunks,
              preUploadPercent:100              
            })
          }
        }
        console.log('=====', params);
        FileReader.onerror = function () {
          console.warn('oops, something went wrong.');
        };
        // const fr = new FileReader();
        function loadNext() {
          var start = currentChunk * chunkSize,
            end = ((start + chunkSize) >= file.size) ? file.size : start + chunkSize;
            chunkFileReader.readAsArrayBuffer(file.slice(start, end));
        }

        loadNext()

        // 只允许一份文件上传
        this.setState({
          fileList: [file],
          file: file
        })
        return false
      },
      fileList: this.state.fileList,
    }
    

    return (
      <div className="content-inner">
        <Spin tip={
              <div >
                <h3 style={{margin:'10px auto',color:'#1890ff'}}>文件预处理中...</h3>
                <Progress width={80} percent={preUploadPercent} type="circle" status="active" />
              </div>
              } 
              spinning={preUploading} 
              style={{ height: 350 }}>
          <div style={{ marginTop: 16, height: 250 }}>
            <Dragger {...uploadProp}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">点击或者拖拽文件进行上传</p>
              <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
            </Dragger>
            {uploadPercent>=0&&!!uploading&&<div style={{marginTop:20,width:'95%'}}>
              <Progress percent={uploadPercent} status="active" />
              <h4>文件上传中，请勿关闭窗口</h4>
            </div>}
            {!!uploadRequest&&<h4 style={{color:'#1890ff'}}>上传请求中...</h4>}
            {!!uploaded&&<h4 style={{color:'#52c41a'}}>文件上传成功</h4>}
            <Button type="primary" onClick={this.showConfirm} disabled={!!(this.state.preUploadPercent <100)}>
                <Icon type="upload" />提交上传
             </Button>
          </div>
        </Spin>
      </div>
    )
  }
}

FileUpload.propTypes = {
  //...
}

export default FileUpload
