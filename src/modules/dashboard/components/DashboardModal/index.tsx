import type { FormEvent } from 'react';
import { FileCheck2, Paperclip, SquarePen, X } from 'lucide-react';
import {
  Field,
  FieldLabel,
  FormGrid,
  ModalBody,
  ModalCard,
  ModalCloseButton,
  ModalDescription,
  ModalEyebrow,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  ModalPrimaryButton,
  ModalSecondaryButton,
  ModalTitle,
  ModalTitleBlock,
  StatusBadge,
  StatusBanner,
  TextAreaControl,
} from '../../styles';

interface DashboardModalProps {
  open: boolean;
  submitting: boolean;
  studentName: string;
  justification: string;
  attachmentName: string;
  error: string | null;
  onClose: () => void;
  onJustificationChange: (justification: string) => void;
  onAttachmentChange: (file: File | null) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

export function DashboardModal({
  open,
  submitting,
  studentName,
  justification,
  attachmentName,
  error,
  onClose,
  onJustificationChange,
  onAttachmentChange,
  onSubmit,
}: DashboardModalProps) {
  if (!open) {
    return null;
  }

  return (
    <ModalOverlay onClick={onClose} role="presentation">
      <ModalCard
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="justification-modal-title"
      >
        <ModalHeader>
          <ModalTitleBlock>
            <ModalEyebrow>Ajuste de presença</ModalEyebrow>
            <ModalTitle id="justification-modal-title">Justificar falta</ModalTitle>
            <ModalDescription>
              Registre o motivo para alterar a presença de {studentName} para Justificado.
            </ModalDescription>
          </ModalTitleBlock>

          <ModalCloseButton
            type="button"
            onClick={onClose}
            aria-label="Fechar modal"
            disabled={submitting}
          >
            <X size={16} />
          </ModalCloseButton>
        </ModalHeader>

        <form onSubmit={onSubmit}>
          <ModalBody>
            <StatusBanner tone="info">
              <StatusBadge tone="info">
                <SquarePen size={20} />
              </StatusBadge>
              <div style={{ display: 'grid', gap: 6 }}>
                <strong style={{ color: '#1f2937' }}>Justificativa manual</strong>
                <span style={{ color: '#6b7280', lineHeight: 1.55 }}>
                  A observação ficará disponível na lista de presença para consulta.
                </span>
              </div>
            </StatusBanner>

            <FormGrid>
              <Field>
                <FieldLabel>Motivo da justificativa</FieldLabel>
                <TextAreaControl
                  autoFocus
                  placeholder="Ex.: Atestado médico apresentado."
                  value={justification}
                  onChange={(event) => onJustificationChange(event.target.value)}
                  minLength={3}
                  required
                />
              </Field>

              <Field>
                <FieldLabel>Evidência (opcional)</FieldLabel>
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.doc,.docx"
                  onChange={(event) => onAttachmentChange(event.target.files?.[0] || null)}
                />
                <span style={{ color: '#64748b', fontSize: '0.82rem' }}>
                  <Paperclip size={13} style={{ display: 'inline', marginRight: 6 }} />
                  {attachmentName || 'O arquivo será mantido apenas enquanto este modal estiver aberto.'}
                </span>
              </Field>

              {error ? (
                <StatusBanner tone="danger">
                  <StatusBadge tone="danger">
                    <FileCheck2 size={20} />
                  </StatusBadge>
                  <span style={{ color: '#991b1b', lineHeight: 1.55 }}>{error}</span>
                </StatusBanner>
              ) : null}
            </FormGrid>
          </ModalBody>

          <ModalFooter>
            <ModalSecondaryButton type="button" onClick={onClose} disabled={submitting}>
              Cancelar
            </ModalSecondaryButton>
            <ModalPrimaryButton type="submit" disabled={submitting}>
              {submitting ? 'Salvando...' : 'Salvar justificativa'}
            </ModalPrimaryButton>
          </ModalFooter>
        </form>
      </ModalCard>
    </ModalOverlay>
  );
}
