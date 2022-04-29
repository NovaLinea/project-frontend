import React, { useState, useContext } from 'react'
import '../styles/Create.scss';
import ProjectService from '../API/ProjectService';
import { Context } from "../index";
import { useNavigate } from 'react-router-dom';
import Button from '../components/UI/button/Button';
import Input from '../components/UI/input/Input';
import Select from '../components/UI/select/Select';
import Textarea from '../components/UI/textarea/Textarea';
import Error from '../components/UI/error/Error';


const Create = () => {
    const {store} = useContext(Context)
    const navigate = useNavigate();
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [nameProject, setNameProject] = useState("");
    const [typeProject, setTypeProject] = useState("sale");
    const [descriptionProject, setDescriptionProject] = useState("");
    const [priceProject, setPriceProject] = useState("");
    const [countStaff, setCountStaff] = useState("");
    const [paymentSystem, setPaymentSystem] = useState("");
    const [descriptionStaff, setDescritpionStaff] = useState("");

    async function createProject() {
        try {
            await ProjectService.createProject(store.isUserID, nameProject, descriptionProject, typeProject, priceProject, countStaff, paymentSystem, descriptionStaff);
            
            navigate(`/profile/${store.isUserID}`);
        } catch (e) {
            setIsError('Ошибка при создании проекта');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
    }

    return (
        <div className='create'>
            <div className="create__header">
                <b className="title">Создание проекта</b>
                <Button mode='fill' onClick={createProject}>Создать</Button>
            </div>

            <div className="create__boby">
                <div className="create__item">
                    <p className="name">Название проекта</p>
                    <Input
                        placeholder="Введите название"
                        value={nameProject} 
                        onChange={e => setNameProject(e.target.value)}
                    />
                </div>

                <div className="create__item">
                    <p className="name">Описание проекта</p>
                    <Textarea 
                        placeholder="Введите описание"
                        value={descriptionProject} 
                        onChange={e => setDescriptionProject(e.target.value)}
                    />
                </div>

                <div className="create__item type-project">
                    <p className="name">Тип проекта</p>
                    <Select
                        defaultValue="sale"
                        defaultName="На продажу"
                        options={[{value: "donates", name: "Сбор донатов"}, {value: "team", name: "Набор команды"}]}
                        value={typeProject} 
                        onChange={typeProject => setTypeProject(typeProject)}
                    />
                </div>
                
                {typeProject === 'sale'
                    ?
                    <div className="create__item price-project">
                        <p className="name">Цена проекта</p>
                        <Input
                            type="number"
                            placeholder="Введите цену"
                            value={priceProject} 
                            onChange={e => setPriceProject(e.target.value)}
                        />
                    </div>
                    :
                    typeProject === 'donates'
                        ?
                        <>
                            <div className="create__item target-price-project">
                                <p className="name">Цель дотанов</p>
                                <Input
                                    type="number"
                                    placeholder="Введите цену"
                                    value={priceProject} 
                                    onChange={e => setPriceProject(e.target.value)}
                                />
                            </div>

                            <div className="create__item payment-project">
                                <p className="name">Платежная система</p>
                                <Input
                                    placeholder="Введите платежную систему"
                                    value={paymentSystem} 
                                    onChange={e => setPaymentSystem(e.target.value)}
                                />
                            </div>
                        </>
                        :
                        <>
                            <div className="create__item count-staff-project">
                                <p className="name">Сколько сотрудников</p>
                                <Input
                                    type="number"
                                    placeholder="Введите количество"
                                    value={countStaff} 
                                    onChange={e => setCountStaff(e.target.value)}
                                />
                            </div>

                            <div className="create__item description-staff-project">
                                <p className="name">Какие сотрудники требуются</p>
                                <Textarea
                                    placeholder="Введите сотрудников"
                                    value={descriptionStaff} 
                                    onChange={e => setDescritpionStaff(e.target.value)}
                                />
                            </div>
                        </>
                }
            </div>
            
            {store.isError &&
                <Error mode='error'>{store.isError}</Error>
            }

            {isError &&
                <Error mode='error'>{isError}</Error>
            }
        </div>
    );
};

export default Create;
