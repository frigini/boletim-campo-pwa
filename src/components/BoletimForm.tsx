import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { BoletimCampo } from '../types';
import { Save, FileText, Calendar, Clock, User, Building } from 'lucide-react';
import { format } from 'date-fns';

interface BoletimFormProps {
  onSave: (boletim: Partial<BoletimCampo>) => void;
  initialData?: Partial<BoletimCampo>;
}

const BoletimForm: React.FC<BoletimFormProps> = ({ onSave, initialData }) => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<BoletimCampo>({
    defaultValues: initialData || {
      data: format(new Date(), 'yyyy-MM-dd'),
      andaimeConvencional: false,
      andaimeEspecial: false,
      andaimeMontado: false,
      andaimeDesmontado: false,
      escoramento: false,
      escada: false,
      espacoConfinado: false,
      torreAcima5m: false,
      torreAbaixo5m: false,
      guardaCorpo: false,
      passarela: false,
      linhaDeVida: false,
      balancim: false,
      pauDeCarga: false,
      barraca: false,
      liderMontagem: false,
      montador: false,
    }
  });

  const onSubmit = (data: BoletimCampo) => {
    onSave(data);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <FileText className="w-8 h-8 text-primary-600" />
          <h1 className="text-2xl font-bold text-gray-900">Boletim de Medição de Campo</h1>
        </div>
        <div className="bg-primary-50 p-4 rounded-lg">
          <p className="text-sm text-primary-700">
            <strong>ENGEVAL SERVIÇOS E ENGENHARIA LTDA</strong><br />
            CNPJ: 43.659.884/0001-01<br />
            END: AV PAPAGAIOS, 50A VISTA Nº 050A<br />
            LINHARES / ES - CEP: 29.905-555<br />
            TEL: 27 99951-5881 - ENGEVAL.ENG@GMAIL.COM
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Cabeçalho */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Building className="w-5 h-5" />
            Informações Gerais
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="form-group">
              <label className="form-label">Nº do Boletim</label>
              <input
                {...register('numero', { required: 'Número é obrigatório' })}
                className="input-field"
                placeholder="Ex: 001/2024"
              />
              {errors.numero && <span className="text-red-500 text-sm">{errors.numero.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Data</label>
              <input
                type="date"
                {...register('data', { required: 'Data é obrigatória' })}
                className="input-field"
              />
              {errors.data && <span className="text-red-500 text-sm">{errors.data.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Cliente</label>
              <input
                {...register('cliente', { required: 'Cliente é obrigatório' })}
                className="input-field"
                placeholder="Nome do cliente"
              />
              {errors.cliente && <span className="text-red-500 text-sm">{errors.cliente.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Solicitante</label>
              <input
                {...register('solicitante', { required: 'Solicitante é obrigatório' })}
                className="input-field"
                placeholder="Nome do solicitante"
              />
              {errors.solicitante && <span className="text-red-500 text-sm">{errors.solicitante.message}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">Equipamento</label>
              <input
                {...register('equipamento')}
                className="input-field"
                placeholder="Equipamento utilizado"
              />
            </div>

            <div className="form-group">
              <label className="form-label">OM</label>
              <input
                {...register('om')}
                className="input-field"
                placeholder="OM"
              />
            </div>

            <div className="form-group col-span-full">
              <label className="form-label">Gerência</label>
              <input
                {...register('gerencia')}
                className="input-field"
                placeholder="Gerência responsável"
              />
            </div>
          </div>
        </div>

        {/* Tipo de Andaime */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Tipo de Andaime</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('andaimeConvencional')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Andaime Convencional</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('andaimeEspecial')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Andaime Especial</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('andaimeMontado')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Andaime Montado</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('andaimeDesmontado')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Andaime Desmontado</span>
            </label>
          </div>
        </div>

        {/* Apropriação de Andaimes */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5" />
            Apropriação de Andaimes
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Montagem */}
            <div>
              <h3 className="font-medium mb-3 text-primary-700">Montagem</h3>
              <div className="space-y-3">
                <div className="form-group">
                  <label className="form-label">Data</label>
                  <input
                    type="date"
                    {...register('montagemData')}
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Hora Inicial</label>
                    <input
                      type="time"
                      {...register('montagemHoraInicial')}
                      className="input-field"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hora Final</label>
                    <input
                      type="time"
                      {...register('montagemHoraFinal')}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Desmontagem */}
            <div>
              <h3 className="font-medium mb-3 text-primary-700">Desmontagem</h3>
              <div className="space-y-3">
                <div className="form-group">
                  <label className="form-label">Data</label>
                  <input
                    type="date"
                    {...register('desmontagemData')}
                    className="input-field"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="form-group">
                    <label className="form-label">Hora Inicial</label>
                    <input
                      type="time"
                      {...register('desmontagemHoraInicial')}
                      className="input-field"
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Hora Final</label>
                    <input
                      type="time"
                      {...register('desmontagemHoraFinal')}
                      className="input-field"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Tipos Específicos */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Tipos Específicos</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('escoramento')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Escoramento</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('escada')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Escada</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('espacoConfinado')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Espaço Confinado</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('torreAcima5m')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Torre Acima 5M</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('torreAbaixo5m')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Torre Abaixo 5M</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('guardaCorpo')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Guarda Corpo</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('passarela')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Passarela</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('linhaDeVida')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Linha de Vida</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('balancim')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Balancim</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('pauDeCarga')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Pau de Carga</span>
            </label>

            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('barraca')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm">Barraca</span>
            </label>
          </div>
        </div>

        {/* Dimensões */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Dimensões do Andaime</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="form-group">
              <label className="form-label">Comprimento (m)</label>
              <input
                {...register('comprimento')}
                className="input-field"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Largura (m)</label>
              <input
                {...register('largura')}
                className="input-field"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Altura (m)</label>
              <input
                {...register('altura')}
                className="input-field"
                placeholder="0.00"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Quantidade</label>
              <input
                {...register('quantidade')}
                className="input-field"
                placeholder="1"
              />
            </div>
          </div>
        </div>

        {/* Horas de Disposição */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Horas de Disposição (Equipe/Hora)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="form-group">
              <label className="form-label">Data</label>
              <input
                type="date"
                {...register('disposicaoData')}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hora Inicial</label>
              <input
                type="time"
                {...register('disposicaoHoraInicial')}
                className="input-field"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Hora Final</label>
              <input
                type="time"
                {...register('disposicaoHoraFinal')}
                className="input-field"
              />
            </div>
          </div>
        </div>

        {/* Solicitante do Serviço e Equipe */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <User className="w-5 h-5" />
            Solicitante do Serviço e Equipe Disponível
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-medium mb-3 text-primary-700">Solicitante do Serviço</h3>
              <div className="space-y-3">
                <div className="form-group">
                  <label className="form-label">Solicitante</label>
                  <input
                    {...register('solicitanteServico')}
                    className="input-field"
                    placeholder="Nome do solicitante"
                  />
                </div>
                <div className="form-group">
                  <label className="form-label">Matrícula</label>
                  <input
                    {...register('matriculaSolicitante')}
                    className="input-field"
                    placeholder="Matrícula"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-medium mb-3 text-primary-700">Equipe Disponível</h3>
              <div className="space-y-3">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('liderMontagem')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm">Líder de Montagem (S)</span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    {...register('montador')}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm">Montador (S)</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Observações */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Observações</h2>
          <div className="form-group">
            <textarea
              {...register('observacoes')}
              className="input-field min-h-[120px] resize-vertical"
              placeholder="Digite suas observações aqui..."
            />
          </div>
        </div>

        {/* Responsáveis */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h2 className="text-lg font-semibold mb-4">Responsáveis</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="form-group">
              <label className="form-label">Responsável ENGEVAL</label>
              <input
                {...register('responsavelEngeval')}
                className="input-field"
                placeholder="Nome do responsável"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Responsável Contratante</label>
              <input
                {...register('responsavelContratante')}
                className="input-field"
                placeholder="Nome do responsável"
              />
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex justify-end space-x-4 pt-6 border-t">
          <button
            type="submit"
            className="btn-primary flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Salvar Boletim
          </button>
        </div>
      </form>
    </div>
  );
};

export default BoletimForm;
