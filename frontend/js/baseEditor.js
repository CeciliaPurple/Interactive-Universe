class BaseEditor {
    constructor(className) {
        this.editableClass = className;
    }

    enableEditing(element) {
        element.setAttribute('contenteditable', 'true');
        element.classList.add(this.editableClass);
        element.setAttribute('data-original-content', element.innerHTML);

        element.addEventListener('input', () => {
            const original = element.getAttribute('data-original-content');
            if (element.innerHTML !== original) {
                element.setAttribute('data-modified', 'true');
            } else {
                element.removeAttribute('data-modified');
            }
        });
    }

    getModifiedElements() {
        return document.querySelectorAll(`.${this.editableClass}[data-modified="true"]`);
    }

    restoreOriginalContent() {
        document.querySelectorAll(`.${this.editableClass}`).forEach(element => {
            const original = element.getAttribute('data-original-content');
            if (original) element.innerHTML = original;
            element.removeAttribute('data-modified');
        });
    }

    hasUnsavedChanges() {
        return this.getModifiedElements().length > 0;
    }
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaseEditor;
}
