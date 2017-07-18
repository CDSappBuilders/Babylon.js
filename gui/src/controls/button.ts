/// <reference path="../../../dist/preview release/babylon.d.ts"/>

module BABYLON.GUI {
    export class Button extends Rectangle {    
        public pointerEnterAnimation: () => void;
        public pointerOutAnimation: () => void;
        public pointerDownAnimation: () => void;
        public pointerUpAnimation: () => void;

        constructor(public name?: string) {
            super(name);
          
            this.thickness = 1;
            this.isPointerBlocker = true;

            this.pointerEnterAnimation = () => {
                this.alpha -= 0.1;
            }

            this.pointerOutAnimation = () => {
                this.alpha += 0.1;
            }    

            this.pointerDownAnimation = () => {
                this.scaleX -= 0.05;
                this.scaleY -= 0.05;
            }

            this.pointerUpAnimation = () => {
                this.scaleX += 0.05;
                this.scaleY += 0.05;
            }                      
        }

        protected _getTypeName(): string {
            return "Button";
        }

        // While being a container, the button behaves like a control.
        public _processPicking(x: number, y: number, type: number): boolean {
            if (!this.isHitTestVisible || !this.isVisible) {
                return false;
            }

            this._processObservables(type, x, y);

            return true;
        }

        protected _onPointerEnter(): boolean {
            if (!super._onPointerEnter()) {
                return false;
            }

            if (this.pointerEnterAnimation) {
                this.pointerEnterAnimation();
            }

            return true;
        }

        protected _onPointerOut(): void {
            if (this.pointerOutAnimation) {
                this.pointerOutAnimation();
            }

            super._onPointerOut();
        }

        protected _onPointerDown(coordinates: Vector2): boolean {
            if (!super._onPointerDown(coordinates)) {
                return false;
            }


            if (this.pointerDownAnimation) {
                this.pointerDownAnimation();
            }

            return true;
        }

        protected _onPointerUp(coordinates: Vector2): void {
            if (this.pointerUpAnimation) {
                this.pointerUpAnimation();
            }

            super._onPointerUp(coordinates);
        }        

        // Statics
        public static CreateImageButton(name: string, text: string, imageUrl: string): Button {
            var result = new Button(name);

            // Adding text
            var textBlock = new BABYLON.GUI.TextBlock(name + "_button", text);
            textBlock.textWrapping = true;
            textBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            textBlock.paddingLeft = "20%";
            result.addControl(textBlock);   

            // Adding image
            var iconImage = new BABYLON.GUI.Image(name + "_icon", imageUrl);
            iconImage.width = "20%";
            iconImage.stretch = BABYLON.GUI.Image.STRETCH_UNIFORM;
            iconImage.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            result.addControl(iconImage);            

            return result;
        }

        public static CreateImageOnlyButton(name: string, imageUrl: string): Button {
            var result = new Button(name);

            // Adding image
            var iconImage = new BABYLON.GUI.Image(name + "_icon", imageUrl);
            iconImage.stretch = BABYLON.GUI.Image.STRETCH_FILL;
            iconImage.horizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_LEFT;
            result.addControl(iconImage);            

            return result;
        }

        public static CreateSimpleButton(name: string, text: string): Button {
            var result = new Button(name);

            // Adding text
            var textBlock = new BABYLON.GUI.TextBlock(name + "_button", text);
            textBlock.textWrapping = true;
            textBlock.textHorizontalAlignment = BABYLON.GUI.Control.HORIZONTAL_ALIGNMENT_CENTER;
            result.addControl(textBlock);           

            return result;
        }
    }    
}