import { Endpoint } from "@/core/common/apiLink";
import { SloganParams } from "@/infrastructure/interface/slogan/slogan.interface";
import RequestService from "@/infrastructure/utils/response";

class SloganService {
    async GetSlogan(params: SloganParams, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(Endpoint.Slogan.Get, {
                    ...params
                })
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };
    async GetSloganById(id: string, setLoading: Function) {
        setLoading(true)
        try {
            return await RequestService
                .get(`${Endpoint.Slogan.GetById}/${id}`)
                .then(response => {
                    if (response) {
                        return response
                    }
                    setLoading(false)
                    return response;
                });
        } catch (error) {
            console.error(error)
        } finally {
            setLoading(false);
        }
    };
}

const sloganService = new SloganService();

export default sloganService;