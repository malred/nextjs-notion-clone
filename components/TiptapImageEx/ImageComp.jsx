import {NodeViewWrapper} from "@tiptap/react";
import React from "react";

// eslint-disable-next-line react/display-name
export default (props) => {
    // console.log(props)
    return (
        <NodeViewWrapper className="react-component">
            {/*<span className="label">React Image Inside tip tap editor</span>*/}
            <div className="content">
                <img
                    src={props.node.attrs.src}
                    width="100px"
                    height="100px"
                    alt="testimg"
                />
                <span>
                      <button
                          onClick={() => {
                              // console.log(props)
                              // props.editor.commands.deleteNode(props.node)
                              props.deleteNode();
                          }}
                      >
                        To delete Image
                      </button>
                </span>
            </div>
        </NodeViewWrapper>
    );
};
