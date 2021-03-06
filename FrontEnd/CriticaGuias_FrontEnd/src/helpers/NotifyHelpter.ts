import { _helperConstants } from "./_helperConstants"
import { _helperModel } from "./_helperModel"

class NotifyHelper {

    criaNotify(mensagem: string, tipo: string, objResult? : any): _helperModel.Notify {
        let notify: _helperModel.Notify = {
            message: mensagem,
            progress: true,
            type: tipo, 
            objResult : objResult
        }
        return notify;
    }

    sucesso(msg?: string, objResult? : any): _helperModel.Notify {
        let mensagem = msg ?? _helperConstants.MsgGenerica.SUCESSO
        return this.criaNotify(mensagem, _helperConstants.Notify.POSITIVE, objResult);
    }


    erro(err: any): _helperModel.Notify {
        let data = err;
        let message = data.error ? data.error.message : data;

        return this.criaNotify(message, _helperConstants.Notify.NEGATIVE);

    }

}

export default new NotifyHelper()