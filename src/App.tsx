import React, { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './components/Login';
import ForgotPassword from './components/ForgotPassword';
import BoletimForm from './components/BoletimForm';
import BoletimList from './components/BoletimList';
import { BoletimCampo } from './types';
import generateBoletimPDFFromTemplate from './utils/pdfGeneratorTemplate';
import boletimExemploCompleto from './utils/boletimExemploCompleto';
import { LogOut, User, FileText, List } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { localDatabaseService as databaseService } from './services/localDatabase';

type ViewType = 'list' | 'form';

const AppContent: React.FC = () => {
  const { user, logout } = useAuth();
  const [currentView, setCurrentView] = useState<ViewType>('list');
  const [editingBoletim, setEditingBoletim] = useState<BoletimCampo | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  const handleSaveBoletim = async (boletimData: Partial<BoletimCampo>) => {
    try {
      if (editingBoletim) {
        // Editando boletim existente
        const updatedBoletim = {
          ...editingBoletim,
          ...boletimData,
          updatedAt: new Date()
        };
        
        await databaseService.updateBoletim(updatedBoletim);
      } else {
        // Criando novo boletim
        const newBoletim: BoletimCampo = {
          id: uuidv4(),
          userId: user!.id,
          createdAt: new Date(),
          updatedAt: new Date(),
          ...boletimData
        } as BoletimCampo;
        
        await databaseService.createBoletim(newBoletim);
      }
      
      setEditingBoletim(null);
      setCurrentView('list');
    } catch (error) {
      console.error('Erro ao salvar boletim:', error);
      alert('Erro ao salvar boletim. Tente novamente.');
    }
  };

  const handleEditBoletim = (boletim: BoletimCampo) => {
    setEditingBoletim(boletim);
    setCurrentView('form');
  };

  const handleNewBoletim = () => {
    setEditingBoletim(null);
    setCurrentView('form');
  };

  const handleGeneratePDF = async (boletim: BoletimCampo) => {
    try {
      await generateBoletimPDFFromTemplate(boletim);
    } catch (error) {
      console.error('Erro ao gerar PDF:', error);
      alert('Erro ao gerar PDF. Verifique se todos os dados estão preenchidos e tente novamente.');
    }
  };

  const handleTestePDF = async () => {
  try {
    await generateBoletimPDFFromTemplate(boletimExemploCompleto);
  } catch (error) {
    console.error('Erro ao gerar PDF de teste:', error);
  }
};

  const handleBackToList = () => {
    setEditingBoletim(null);
    setCurrentView('list');
  };

  if (!user) {
    if (showForgotPassword) {
      return (
        <ForgotPassword 
          onBack={() => setShowForgotPassword(false)}
        />
      );
    }
    
    return (
      <Login 
        onToggleMode={() => {}}
        onForgotPassword={() => setShowForgotPassword(true)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <FileText className="w-8 h-8 text-primary-600" />
              <h1 className="text-xl font-semibold text-gray-900">
                Boletim de Campo
              </h1>
            </div>
            
            <nav className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentView('list')}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'list'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <List className="w-4 h-4" />
                <span>Lista</span>
              </button>
              
              <button
                onClick={handleNewBoletim}
                className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  currentView === 'form'
                    ? 'bg-primary-100 text-primary-700'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                <FileText className="w-4 h-4" />
                <span>Novo Boletim</span>
              </button>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <User className="w-4 h-4" />
                <span>{user.name}</span>
              </div>
              
              <button
                onClick={logout}
                className="flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span>Sair</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-8">
        {currentView === 'list' ? (
          <BoletimList
            onEdit={handleEditBoletim}
            onNew={handleNewBoletim}
            onGeneratePDF={handleTestePDF}
          />
        ) : (
          <div className="max-w-4xl mx-auto px-4">
            <div className="mb-6">
              <button
                onClick={handleBackToList}
                className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium"
              >
                <span>← Voltar para lista</span>
              </button>
            </div>
            
            <BoletimForm
              onSave={handleSaveBoletim}
              initialData={editingBoletim || undefined}
            />
          </div>
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default App;
