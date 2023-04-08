import { HtmlEditor, Image, Inject, Link, QuickToolbar, RichTextEditorComponent, Toolbar } from '@syncfusion/ej2-react-richtexteditor';
import * as React from 'react';

export class TextEditor extends React.Component {
  rteObj;

  render() {
    const defaultContent = `
        <p className=" text-2xl" >Welcome to my blog! Welcome to my blog!  </p>
        <p>In this blog, I will sh are my experiences and insights on various topics related to programming and web development.</p>
        <p>Stay tuned for more updates!</p>
      `;

    return (
      <div className='control-pane'>
        <div className='control-section' id="rte">
          <div className='rte-control-section'>
            <RichTextEditorComponent id="defaultRTE" readOnly = {true} ref={(richtexteditor) => { this.rteObj = richtexteditor; }}>
              <div dangerouslySetInnerHTML={{ __html: defaultContent }}></div>
              <Inject services={[HtmlEditor,  Image, Link, QuickToolbar, Toolbar]}/>
            </RichTextEditorComponent>
          </div>
        </div>
      </div>
    );
  }
}

export default TextEditor