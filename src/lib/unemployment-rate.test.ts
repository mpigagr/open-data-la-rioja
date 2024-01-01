import { expect, test, afterEach, vi, describe } from 'vitest'
import { getUnemploymentRateByAgeGroup } from './unemployment-rate'
import database from './shared/database'

describe('unempeloyment-rate', () => {
    afterEach(() => {
        vi.restoreAllMocks()
    })

    test('should clear egde cases', async () => {
        const databaseMock = vi.spyOn(database, 'get')
        const databaseDtos = [{
            "[Measures].[Personas], [SEXO ].[Hombres]": 6615.63,
            "[Measures].[Personas], [SEXO ].[Mujeres]":6043.63,
            "[Measures].[Personas], [SEXO ].[Ambos sexos]":12659.26,
            "[Measures].[Porcentaje por edad], [SEXO ].[Ambos sexos]":100.0,
            "[CICLO]":"[CICLO].[2022 (T. 3)]",
            "[GRUPOS DE EDAD ]":"[GRUPOS DE EDAD ].[Decenios]",
            "[Measures].[Porcentaje por edad], [SEXO ].[Hombres]":100.0,
            "[Measures].[Porcentaje por edad], [SEXO ].[Mujeres]":100.0
        }, {
            "[Measures].[Personas], [SEXO ].[Hombres]": null,
            "[Measures].[Personas], [SEXO ].[Mujeres]": 90.44,
            "[Measures].[Personas], [SEXO ].[Ambos sexos]": 90.44,
            "[Measures].[Porcentaje por edad], [SEXO ].[Ambos sexos]": 0.7144177463769604,
            "[CICLO]": "[CICLO].[2022 (T. 3)]",
            "[GRUPOS DE EDAD ]": "[GRUPOS DE EDAD ].[de 65 y más años]",
            "[Measures].[Porcentaje por edad], [SEXO ].[Hombres]": null,
            "[Measures].[Porcentaje por edad], [SEXO ].[Mujeres]": 1.4964516358546105
        }, {
            "[Measures].[Personas], [SEXO ].[Hombres]": 1077.42,
            "[Measures].[Personas], [SEXO ].[Mujeres]": 1549.23,
            "[Measures].[Personas], [SEXO ].[Ambos sexos]": 2626.65,
            "[Measures].[Porcentaje por edad], [SEXO ].[Ambos sexos]": 20.74884313933042,
            "[CICLO]": "[CICLO].[2022 (T. 3)]",
            "[GRUPOS DE EDAD ]": "[GRUPOS DE EDAD ].[de 56 a 64 años]",
            "[Measures].[Porcentaje por edad], [SEXO ].[Hombres]": 16.285977299214135,
            "[Measures].[Porcentaje por edad], [SEXO ].[Mujeres]": 25.63409738849003
        }]
        
        const expected = [{
            "year": 2022,
            "De 56 a 64 años": 20.75,
        }]

        databaseMock.mockResolvedValue(databaseDtos)

        const { data, index, categories } = await getUnemploymentRateByAgeGroup({ groupName: "average" })

        expect(data).toEqual(expected)
        expect(index).toEqual("year")
        expect(categories).toEqual(["De 56 a 64 años"])
    })
    
    test('should return value by group name', async () => {
        const databaseMock = vi.spyOn(database, 'get')
        const databaseDtos = [{
            "[Measures].[Personas], [SEXO ].[Hombres]": 1179.26,
            "[Measures].[Personas], [SEXO ].[Mujeres]": 2250,
            "[Measures].[Personas], [SEXO ].[Ambos sexos]": 3429.26,
            "[Measures].[Porcentaje por edad], [SEXO ].[Ambos sexos]": 21.15268129539093,
            "[CICLO]": "[CICLO].[2022 (T. 2)]",
            "[GRUPOS DE EDAD ]": "[GRUPOS DE EDAD ].[de 16 a 25 años]",
            "[Measures].[Porcentaje por edad], [SEXO ].[Hombres]": 13.930318873723927,
            "[Measures].[Porcentaje por edad], [SEXO ].[Mujeres]": 29.04530034131455
        }, {
            "[Measures].[Personas], [SEXO ].[Hombres]": 1077.42,
            "[Measures].[Personas], [SEXO ].[Mujeres]": 1549.23,
            "[Measures].[Personas], [SEXO ].[Ambos sexos]": 2626.65,
            "[Measures].[Porcentaje por edad], [SEXO ].[Ambos sexos]": 20.74884313933042,
            "[CICLO]": "[CICLO].[2022 (T. 3)]",
            "[GRUPOS DE EDAD ]": "[GRUPOS DE EDAD ].[de 56 a 64 años]",
            "[Measures].[Porcentaje por edad], [SEXO ].[Hombres]": 16.285977299214135,
            "[Measures].[Porcentaje por edad], [SEXO ].[Mujeres]": 25.63409738849003
        }, {
            "[Measures].[Personas], [SEXO ].[Hombres]": 1179.26,
            "[Measures].[Personas], [SEXO ].[Mujeres]": 2250,
            "[Measures].[Personas], [SEXO ].[Ambos sexos]": 3429.26,
            "[Measures].[Porcentaje por edad], [SEXO ].[Ambos sexos]": 21.15268129539093,
            "[CICLO]": "[CICLO].[2022 (T. 3)]",
            "[GRUPOS DE EDAD ]": "[GRUPOS DE EDAD ].[de 16 a 25 años]",
            "[Measures].[Porcentaje por edad], [SEXO ].[Hombres]": 13.930318873723927,
            "[Measures].[Porcentaje por edad], [SEXO ].[Mujeres]": 19.04530034131455
        }]
        
        const expected = [{
            "year": 2022,
            "De 56 a 64 años": 25.63,
            "De 16 a 25 años": 24.05,
        }]

        databaseMock.mockResolvedValue(databaseDtos)

        const { data, index, categories } = await getUnemploymentRateByAgeGroup({ groupName: "women" })

        expect(data).toEqual(expected)
        expect(index).toEqual("year")
        expect(categories).toEqual(expect.arrayContaining(["De 56 a 64 años", "De 16 a 25 años"]))
    })
})