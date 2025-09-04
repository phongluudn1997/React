import './App.css';
import { InteractiveTableExample } from './example/interactive-table/InteractiveTable';
import { TranslationProvider } from './providers/TranslationProvider.tsx';
import { LocalChooser } from './components/LocalChooser.tsx';
import { Translation } from './example/Translation.tsx';

function App() {
  return (
    <div className="flex items-center content-center">
      <TranslationProvider>
        <LocalChooser />
        <Translation />
        <InteractiveTableExample />
      </TranslationProvider>
    </div>
  );
}

export default App;
