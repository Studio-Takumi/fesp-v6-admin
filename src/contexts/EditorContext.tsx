import { createContext, useContext } from 'react';
import { CustomEditor } from './useCustomEditor';

export const EditorContext = createContext<CustomEditor | null>(null);
export const useEditorInstance = () => {
    const editor = useContext(EditorContext);
    if (!editor) throw new Error('Editor not found');
    return editor;
};
