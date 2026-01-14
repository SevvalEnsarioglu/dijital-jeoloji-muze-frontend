import React, { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';

const ToastContext = createContext();

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const toast = useRef(null);

    const showSuccess = (message, detail = '') => {
        toast.current?.show({
            severity: 'success',
            summary: message,
            detail: detail,
            life: 3000
        });
    };

    const showError = (message, detail = '') => {
        toast.current?.show({
            severity: 'error',
            summary: message,
            detail: detail,
            life: 4000
        });
    };

    const showWarn = (message, detail = '') => {
        toast.current?.show({
            severity: 'warn',
            summary: message,
            detail: detail,
            life: 3000
        });
    };

    const showInfo = (message, detail = '') => {
        toast.current?.show({
            severity: 'info',
            summary: message,
            detail: detail,
            life: 3000
        });
    };

    const confirm = ({ message, header = 'Onay', acceptLabel = 'Evet', rejectLabel = 'Hayır', accept, reject }) => {
        confirmDialog({
            message: message,
            header: header,
            icon: 'pi pi-exclamation-triangle',
            acceptLabel: acceptLabel,
            rejectLabel: rejectLabel,
            accept: accept,
            reject: reject,
            acceptClassName: 'p-button-danger',
            rejectClassName: 'p-button-text'
        });
    };

    const value = {
        showSuccess,
        showError,
        showWarn,
        showInfo,
        confirm
    };

    return (
        <ToastContext.Provider value={value}>
            <Toast ref={toast} position="top-right" />
            <ConfirmDialog />
            {children}
        </ToastContext.Provider>
    );
};
