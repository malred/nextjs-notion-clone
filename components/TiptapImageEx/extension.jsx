import { mergeAttributes, Node } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import ImageComp from "./ImageComp";
// import ParaComp from "./paraComp";

export default Node.create({
    name: "reactComponent",
    group: "block",
    atom: true,
    addAttributes() {
        return {
            src: {
                default: ""
            }
        };
    },

    // addCommands() {
    //   return {
    //     setImage: (options) => ({ tr, commands }) => {
    //       if (tr.selection?.node?.type?.name == "custom-image") {
    //         return commands.updateAttributes("custom-image", options);
    //       } else {
    //         return commands.insertContent({
    //           type: this.name,
    //           attrs: options
    //         });
    //       }
    //     }
    //   };
    // },

    parseHTML() {
        return [
            {
                tag: "react-component"
            }
        ];
    },

    renderHTML({ HTMLAttributes }) {
        return ["react-component", mergeAttributes(HTMLAttributes)];
    },

    addNodeView() {
        return ReactNodeViewRenderer(ImageComp);
    }
});
