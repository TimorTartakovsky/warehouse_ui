
// TO DO ADD helpers
export enum DocNumberPrefix {
    TRTN = 'TRTN',
    TRTI = 'TRTI',
    TRTG = 'TRTG',
    TRTC = 'TRTC',
    TRNT = 'TRNT',
    TRNI = 'TRNI',
    TRNG = 'TRNG',
    TRNC = 'TRNC',
    TRIT = 'TRIT',
    TRIN = 'TRIN',
    TRIG = 'TRIG',
    TRIC = 'TRIC',
    TRGT = 'TRGT',
    TRGN = 'TRGN',
    TRGI = 'TRGI',
    TRGC = 'TRGC',
    TRCT = 'TRCT',
    TRCN = 'TRCN',
    TRCI = 'TRCI',
    TRCG = 'TRCG',
    NONE = 'NONE',
}

export const whichDocPrefix = (docNumber: string = ''): DocNumberPrefix => {
    if (!docNumber) {
        return DocNumberPrefix.NONE;
    } else {
        const prefix = docNumber.substr(0, 3);
        switch (prefix) {
            case DocNumberPrefix.TRTN: return DocNumberPrefix.TRTN;
            case DocNumberPrefix.TRTI: return DocNumberPrefix.TRTI;
            case DocNumberPrefix.TRTG: return DocNumberPrefix.TRTG;
            case DocNumberPrefix.TRTC: return DocNumberPrefix.TRTC;
            case DocNumberPrefix.TRNI: return DocNumberPrefix.TRNI;
            case DocNumberPrefix.TRNG: return DocNumberPrefix.TRNG;
            case DocNumberPrefix.TRNC: return DocNumberPrefix.TRNC;
            case DocNumberPrefix.TRIT: return DocNumberPrefix.TRIT;
            case DocNumberPrefix.TRIN: return DocNumberPrefix.TRIN;
            case DocNumberPrefix.TRIG: return DocNumberPrefix.TRIG;
            case DocNumberPrefix.TRIC: return DocNumberPrefix.TRIC;
            case DocNumberPrefix.TRGT: return DocNumberPrefix.TRGT;
            case DocNumberPrefix.TRGN: return DocNumberPrefix.TRGN;
            case DocNumberPrefix.TRGI: return DocNumberPrefix.TRGI;
            case DocNumberPrefix.TRGC: return DocNumberPrefix.TRGC;
            case DocNumberPrefix.TRCT: return DocNumberPrefix.TRCT;
            case DocNumberPrefix.TRCN: return DocNumberPrefix.TRCN;
            case DocNumberPrefix.TRCI: return DocNumberPrefix.TRCI;
            case DocNumberPrefix.TRCG: return DocNumberPrefix.TRCG;
            default: return DocNumberPrefix.NONE; 
        }
    }
}

export const DUMP = 'dump'
