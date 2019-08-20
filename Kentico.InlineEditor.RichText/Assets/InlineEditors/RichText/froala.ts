import FroalaEditor, { RegisterCommand } from "froala-editor/js/froala_editor.pkgd.min";

import { UPDATE_WIDGET_PROPERTY_EVENT_NAME } from "@/shared/constants";
import { insertImageCommand } from "./commands/insert-image";
import { imageReplaceCommand } from "./commands/image-replace";

export const initializeFroalaEditor = (element: HTMLElement, inlineEditor: HTMLElement, propertyName: string) => {
    RegisterCommand("insertImageKentico", insertImageCommand);
    RegisterCommand("imageReplaceKentico", imageReplaceCommand);

    new FroalaEditor(element, {
        toolbarInline: true,
        quickInsertEnabled: false,
        charCounterCount: false,
        toolbarVisibleWithoutSelection: true,
        imageEditButtons: ["imageReplaceKentico", "imageAlign", "imageCaption", "imageRemove", "|", "imageLink", "linkOpen", "linkEdit",
            "linkRemove", "-", "imageDisplay", "imageStyle", "imageAlt", "imageSize"],
        toolbarButtons:
        {
            moreText: {
                buttons: ["bold", "italic", "underline", "strikeThrough", "subscript", "superscript", "fontFamily", "fontSize", "textColor",
                    "backgroundColor", "inlineClass", "inlineStyle", "clearFormatting"]
            },
            moreParagraph: {
                buttons: ["alignLeft", "alignCenter", "formatOLSimple", "alignRight", "alignJustify", "formatOL", "formatUL", "paragraphFormat",
                    "paragraphStyle", "lineHeight", "outdent", "indent", "quote"]
            },
            moreRich: {
                buttons: ["insertLink", "insertImageKentico", "insertVideo", "insertTable", "emoticons", "fontAwesome", "specialCharacters",
                    "embedly", "insertFile", "insertHR"]
            },
            moreMisc: {
                buttons: ["undo", "redo", "fullscreen", "print", "getPDF", "spellChecker", "selectAll", "html", "help"],
                align: "right",
                buttonsVisible: 2,
            }
        },
        events: {
            contentChanged(this: FroalaEditor) {
                const event = new CustomEvent(UPDATE_WIDGET_PROPERTY_EVENT_NAME, {
                    detail: {
                        name: propertyName,
                        value: this.html.get(),
                        refreshMarkup: false
                    }
                });

                inlineEditor.dispatchEvent(event);
            },
        },
    });
}

export const destroyFroalaEditor = (element: HTMLElement) => {
    const froala = (element as any)["data-froala.editor"];

    if (froala) {
        froala.destroy();
    }
}