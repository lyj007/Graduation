
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const CustomButton = () => <span className="octicon octicon-star" />;
function insertStar() {
  const cursorPosition = this.quill.getSelection().index;
  this.quill.insertText(cursorPosition, "★");
  this.quill.setSelection(cursorPosition + 1);
}

const CustomToolbar = () => (
  <div id="toolbar">
    <select className="ql-header" defaultValue={""} onChange={e => e.persist()}>
      <option value="1" />
      <option value="2" />
      <option selected />
    </select>
    <button className="ql-bold" />
    <button className="ql-italic" />
    <select className="ql-color">
      <option value="red" />
      <option value="green" />
      <option value="blue" />
      <option value="orange" />
      <option value="violet" />
      <option value="#d0d1d2" />
      <option selected />
    </select>
    <button className="ql-insertStar">
      <CustomButton />
    </button>
  </div>
);

/* 
 * Editor component with custom toolbar and content containers
 */
class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = { editorHtml: "发热减肥不能惹饭局染发让南方人 v让女人减肥染发让你放假" };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(html) {
    this.setState({ editorHtml: html });
  }

  render() {
    return (
      <div className="text-editor">
        <CustomToolbar />
        <ReactQuill
          onChange={this.handleChange}
          placeholder={this.props.placeholder}
          modules={Editor.modules}
          formats={Editor.formats}
          style={{ width: '60%' }}
          theme={"snow"}
          defaultValue={`
          ${<p>一、任务专业(或名称)</p>}
          
          土建/精装修/道路.....算量或组价
        二、任务范围
          计量：**号楼（地上、地下）主体建筑算量，轴号**至**区域（楼层**至**）精装修算量，道路**专业或道路桩号**至**算量；含上机或按**任务要求汇总；由任务包**负责统一建轴线及设置；由任务包**负责图纸资料问题的收集汇总；
          组价：**专业组价含编制说明，包含（不包含）**部分；由任务包**负责问题的收集汇总；
          （要求工作范围清晰，不漏项目，各人员之间不重复）
        三、时间要求
            **日前提交**阶段成果文件（如有阶段性提交成果文件需求）；**日前提交最终成果文件；（可要求过程中隔几日上传一次中间成果文件）
        四、计量计价依据
          1、**定额、**清单
          2、**图纸
          3、**方案
          4、**清单编制会议纪要
          5、**管理办法/制度流程
          ...........
        五、软件要求
           算量：**软件/excle表格计算
          计价：**软件/excle表格
        六、成果文件要求：
          **软件图形算量结果软件，分楼栋单独提交，以及导出的EXCell表格；
          **软件计价，分专业（土建、钢结构等）分楼号分区域单独简历单位工程，以及导出为ECCELL表格（包含**表、**表、......）
        七、其他要求和注意事项
          1、 ** 日任务包**、任务包**需进行现场踏勘 ，按**要求形成踏勘记录表；`}
        />
      </div>
    );
  }
}

/* 
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: {
    container: "#toolbar",
    handlers: {
      insertStar: insertStar
    }
  },
  clipboard: {
    matchVisual: false,
  }
};

Editor.formats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color"
];
export default Editor;
// ReactDOM.render(
//   <Editor placeholder={"Write something or insert a star ★"} />,
//   document.querySelector(".app")
// );
