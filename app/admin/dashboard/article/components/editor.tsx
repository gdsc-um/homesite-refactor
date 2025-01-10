// Importing helper modules
import { FC } from "react";

// Importing core components
import ReactQuill from "react-quill-new";

// Importing styles
import 'react-quill-new/dist/quill.snow.css';

interface EditorProps {
    value: string,
    setValue: (value: string) => void
}

const Editor: FC<EditorProps> = ({ value, setValue }) => {

    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, false] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link',],
            ['clean']
        ],
    }
    const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'indent',
        'link',
    ]

    return <>
        <ReactQuill
            theme="snow"
            value={value}
            onChange={setValue}
            modules={modules}
            formats={formats}
        >
        </ReactQuill>
    </>
};

export default Editor;