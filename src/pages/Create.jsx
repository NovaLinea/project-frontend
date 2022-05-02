import React, { useState, useContext } from 'react'
import '../styles/Create.scss';
import ProjectService from '../API/ProjectService';
import { Context } from "../index";
import Button from '../components/UI/button/Button';
import Input from '../components/UI/input/Input';
import Select from '../components/UI/select/Select';
import Textarea from '../components/UI/textarea/Textarea';
import Error from '../components/UI/error/Error';
import { GrFormClose } from 'react-icons/gr';


const Create = () => {
    const {store} = useContext(Context)
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [isNotification, setIsNotification] = useState(null);
    const [nameProject, setNameProject] = useState("");
    const [typeProject, setTypeProject] = useState("sale");
    const [descriptionProject, setDescriptionProject] = useState("");
    const [priceProject, setPriceProject] = useState("");
    const [paymentSystem, setPaymentSystem] = useState("");
    const [nameStaff, setNameStaff] = useState("");
    const [listStaff, setListStaff] = useState([]);

    async function createProject() {
        try {
            if (store.isAuth) {
                if (nameProject === "" || descriptionProject === "" || (typeProject === "donates" && paymentSystem === "") || (typeProject !== "team" && priceProject === "")) {
                    setIsError('Вы заполнили не все поля');
                    setTimeout(() => {
                        setIsError(null)
                    }, timeout)
                }
                else if (typeProject === "team" && listStaff.length === 0) {
                    setIsError('Добавьте хотя бы одну должность');
                    setTimeout(() => {
                        setIsError(null)
                    }, timeout)
                }
                else {
                    await ProjectService.createProject(store.isUserID, nameProject, descriptionProject, typeProject, priceProject, paymentSystem, listStaff);
            
                    setIsNotification('Проект успешно создан');
                    setTimeout(() => {
                        setIsNotification(null)
                    }, timeout)

                    setNameProject("");
                    setDescriptionProject("");
                    setTypeProject("sale");
                    setPriceProject("");
                    setPaymentSystem("");
                    setListStaff([]);
                }
            }
            else {
                setIsError('Вы не авторизованы в системе');
                setTimeout(() => {
                    setIsError(null)
                }, timeout)
            }
        } catch (e) {
            setIsError('Ошибка при создании проекта');
            setTimeout(() => {
                setIsError(null)
            }, timeout)
        }
    }

    const addStaff = () => {
        if (nameStaff) {
            setListStaff([...listStaff, nameStaff]);
            setNameStaff("");
        }
    }

    const deleteStaff = (staff) => {
        const temp = [...listStaff];
        temp.splice(staff, 1);
        setListStaff(temp);
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
                                    placeholder="Введите сумму"
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
                        <div className="create__item description-staff-project">
                            <p className="name">Какие сотрудники требуются</p>

                            <ul className='list-staff'>
                                {listStaff.map(staff =>
                                    <div className='list-staff-item'>
                                        <li>{staff}</li>
                                        <GrFormClose className='close' onClick={() => deleteStaff(staff)} />
                                    </div>
                                )}
                            </ul>

                            <div className="form-add-staff">
                                <Input
                                    placeholder="Введите должность"
                                    value={nameStaff} 
                                    onChange={e => setNameStaff(e.target.value)}
                                />
                                <Button mode='fill' onClick={addStaff}>Добавить</Button>
                            </div>
                        </div>
                }
            </div>
            
            {store.isError &&
                <Error mode='error'>{store.isError}</Error>
            }

            {isError &&
                <Error mode='error'>{isError}</Error>
            }

            {isNotification &&
                <Error mode='success'>{isNotification}</Error>
            }
        </div>
    );
};

export default Create;
