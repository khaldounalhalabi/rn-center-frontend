declare module '@ckeditor/ckeditor5-react' {
    import { ComponentType } from 'react';

    export const CKEditor: ComponentType<{
        editor: any;
        data?: string;
        config?: Record<string, any>;
        disabled?: boolean;
        id?: string;
        onReady?: (editor: any) => void;
        onChange?: (event: any, editor: any) => void;
        onBlur?: (event: any, editor: any) => void;
        onFocus?: (event: any, editor: any) => void;
    }>;
}

declare module '@ckeditor/ckeditor5-build-classic' {
    const ClassicEditor: any;
    export default ClassicEditor;
}