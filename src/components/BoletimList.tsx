import React, { useState, useEffect } from 'react';
import { BoletimCampo } from '../types';
import { FileText, Edit, Trash2, Download, Plus, Search } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { localDatabaseService as databaseService } from '../services/localDatabase';
import { useAuth } from '../contexts/AuthContext';

interface BoletimListProps {
  onEdit: (boletim: BoletimCampo) => void;
  onNew: () => void;
  onGeneratePDF: (boletim: BoletimCampo) => void;
}

const BoletimList: React.FC<BoletimListProps> = ({ onEdit, onNew, onGeneratePDF }) => {
  const { user } = useAuth();
  const [boletins, setBoletins] = useState<BoletimCampo[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBoletins, setFilteredBoletins] = useState<BoletimCampo[]>([]);

  useEffect(() => {
    loadBoletins();
  }, []);

  useEffect(() => {
    const filtered = boletins.filter(boletim =>
      boletim.numero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boletim.cliente.toLowerCase().includes(searchTerm.toLowerCase()) ||
      boletim.solicitante.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBoletins(filtered);
  }, [boletins, searchTerm]);

  const loadBoletins = async () => {
    if (!user) return;
    
    try {
      const userBoletins = await databaseService.getBoletinsByUserId(user.id);
      setBoletins(userBoletins);
    } catch (error) {
      console.error('Erro ao carregar boletins:', error);
    }
  };

  const deleteBoletim = async (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este boletim?')) {
      try {
        await databaseService.deleteBoletim(id);
        await loadBoletins(); // Recarregar lista
      } catch (error) {
        console.error('Erro ao excluir boletim:', error);
        alert('Erro ao excluir boletim. Tente novamente.');
      }
    }
  };

  const formatDate = (dateString: string) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy', { locale: ptBR });
    } catch {
      return dateString;
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <FileText className="w-8 h-8 text-primary-600" />
            Controle de Boletins
          </h1>
          <button
            onClick={onNew}
            className="btn-primary flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Novo Boletim
          </button>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="input-field pl-10"
            placeholder="Buscar por número, cliente ou solicitante..."
          />
        </div>
      </div>

      {filteredBoletins.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'Nenhum boletim encontrado' : 'Nenhum boletim cadastrado'}
          </h3>
          <p className="text-gray-600 mb-6">
            {searchTerm 
              ? 'Tente ajustar os termos de busca'
              : 'Comece criando seu primeiro boletim de campo'
            }
          </p>
          {!searchTerm && (
            <button
              onClick={onNew}
              className="btn-primary flex items-center gap-2 mx-auto"
            >
              <Plus className="w-4 h-4" />
              Criar Primeiro Boletim
            </button>
          )}
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Número
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Solicitante
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Equipamento
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Criado em
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBoletins.map((boletim) => (
                  <tr key={boletim.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {boletim.numero || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {boletim.data ? formatDate(boletim.data) : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {boletim.cliente || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {boletim.solicitante || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {boletim.equipamento || '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-500">
                        {boletim.createdAt ? formatDate(boletim.createdAt.toString()) : '-'}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => onGeneratePDF(boletim)}
                          className="text-green-600 hover:text-green-900 p-1 rounded"
                          title="Gerar PDF"
                        >
                          <Download className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => onEdit(boletim)}
                          className="text-primary-600 hover:text-primary-900 p-1 rounded"
                          title="Editar"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteBoletim(boletim.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                          title="Excluir"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {filteredBoletins.length > 0 && (
        <div className="mt-6 text-center text-sm text-gray-500">
          {filteredBoletins.length} boletim(s) encontrado(s)
          {searchTerm && ` para "${searchTerm}"`}
        </div>
      )}
    </div>
  );
};

export default BoletimList;
