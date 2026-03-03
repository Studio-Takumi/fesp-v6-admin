import { Routes, Route } from 'react-router';
import './App.css';
import SideMenu from './components/SideMenu';
import { EditorContext } from './contexts/EditorContext';
import { useCustomEditor } from './contexts/useCustomEditor';
import NewsEdit from './pages/NewsEdit';
import NewsManage from './pages/NewsManage';
import ScheduleEdit from './pages/ScheduleEdit';

function App() {
    const { editor } = useCustomEditor();
    return (
        <EditorContext.Provider value={editor}>
            <div className='flex min-h-screen flex-row bg-slate-100'>
                <SideMenu />
                <Routes>
                    <Route path='/' element={<NewsEdit />} />
                    <Route path='/news' element={<NewsManage />} />
                    <Route path='/news/edit' element={<NewsEdit />} />
                    <Route path='/schedule/edit' element={<ScheduleEdit />} />
                </Routes>
            </div>
        </EditorContext.Provider>
    );
}

export default App;
