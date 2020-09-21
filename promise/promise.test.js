const MyPromise = require('./promises');

const t = setTimeout

describe('vladilen Primise', () => {
    let promise
    let executorSpy

    const successResult = 42
    const errorResult = 'im error'

    beforeEach(() => {
        executorSpy = jest.fn(
            r => t( () => r(successResult), 150)
        )
        promise = new MyPromise(executorSpy)
    })

    test('should exist and tobe typeof function', () => {
        expect(MyPromise).toBeDefined()
        expect(typeof MyPromise).toBe('function')
    })
    test('instance shouldhave methods: then, catch, finaly', () => {
        expect(promise.then).toBeDefined()
        expect(promise.catch).toBeDefined()
        expect(promise.finally).not.toBeUndefined()
    })

    test('should call executro function', () => {
        expect(executorSpy).toHaveBeenCalled()
    })

    test('should get data in then block and chain', async ()=>{
     const result = await promise.then( num => num).then( num => num*2);
     expect(result).toBe(successResult*2)
    })

    test('should catch error', ()=>{
        const errorExecutor = (_, r) => t( ()=>  r(errorResult), 150 )
        const errorPromise = new MyPromise(errorExecutor)

        return new Promise(resolve => {
            errorPromise.catch(error => {
                expect(error).toBe(errorResult)
                resolve()
            })
        })
    })

    test('should call finally method', async ()=> {
        const finallySpy = jest.fn( ()=>{} )
        await promise.finally(finallySpy)

        expect(finallySpy).toHaveBeenCalled()
    })
})