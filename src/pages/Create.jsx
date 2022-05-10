import React, { useState, useContext } from 'react'
import '../styles/Create.scss';
import ProjectService from '../API/ProjectService';
import { Context } from "../index";
import { GrFormClose } from 'react-icons/gr';
import Button from '../components/UI/button/Button';
import Input from '../components/UI/input/Input';
import Error from '../components/UI/error/Error';


const Create = () => {
    const {store} = useContext(Context)
    const timeout = 5000;
    const [isError, setIsError] = useState(null);
    const [isNotification, setIsNotification] = useState(null);
    const [nameProject, setNameProject] = useState("");
    const [descriptionProject, setDescriptionProject] = useState("");
    const [typeProject, setTypeProject] = useState("sale");
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
            if (listStaff.indexOf(nameStaff) === -1) {
                setListStaff([...listStaff, nameStaff]);
                setNameStaff("");
            }
            else {
                setIsError('Такая должность уже указана');
                setTimeout(() => {
                    setIsError(null)
                }, timeout)
            }
        }
    }

    const deleteStaff = (staff) => {
        setListStaff(listStaff.filter(item => item !== staff));
    }

    return (
        <div className='create'>
             <div className="create__editor">
                <div 
                    className={nameProject.length !== 0 ? "title" : "title empty"}
                    contentEditable="true"
                    data-placeholder="Заголовок"
                    value={nameProject}
                    onInput={e => setNameProject(e.currentTarget.textContent)}
                ></div>

                <div 
                    className={descriptionProject.length !== 0 ? "description" : "description empty"}
                    contentEditable="true"
                    data-placeholder="Описание проекта"
                    value={descriptionProject}
                    onInput={e => setDescriptionProject(e.currentTarget.textContent)}
                ></div>

                <div className="type-project">
                    <div onClick={() => setTypeProject('sale')} className={typeProject === 'sale' ? "type__item active" : "type__item"}>
                        На продажу
                    </div>

                    <div onClick={() => setTypeProject('donates')} className={typeProject === 'donates' ? "type__item active" : "type__item"}>
                        Сбор донатов
                    </div>

                    <div onClick={() => setTypeProject('team')} className={typeProject === 'team' ? "type__item active" : "type__item"}>
                        Набор команды
                    </div>
                </div>
                
                {typeProject === 'sale'
                    ?
                    <div className="price-project">
                        <Input
                            type="number"
                            placeholder="Цена проекта"
                            value={priceProject} 
                            onChange={e => setPriceProject(e.target.value)}
                        />
                    </div>
                    :
                    typeProject === 'donates'
                        ?
                        <>
                            <div className="target-donates">
                                <Input
                                    type="number"
                                    placeholder="Цель дотанов"
                                    value={priceProject} 
                                    onChange={e => setPriceProject(e.target.value)}
                                />
                            </div>

                            <div className="payment-project">
                                <Input
                                    placeholder="Платежная система"
                                    value={paymentSystem} 
                                    onChange={e => setPaymentSystem(e.target.value)}
                                />
                            </div>
                        </>
                        :
                        <div className="staff-project">
                            <ul className='list-staff'>
                                {listStaff.map((staff, index) =>
                                    <div key={index} className='list-staff-item'>
                                        <li>{staff}</li>
                                        <GrFormClose className='close' onClick={() => deleteStaff(staff)} />
                                    </div>
                                )}
                            </ul>

                            <div className="form-add-staff">
                                <Input
                                    placeholder="Введите должность"
                                    maxLength={30}
                                    value={nameStaff} 
                                    onChange={e => setNameStaff(e.target.value)}
                                />
                                <Button mode='outline' onClick={addStaff}>Добавить</Button>
                            </div>
                        </div>
                }
            </div>

            <Button mode='fill' onClick={createProject}>Создать</Button>
            
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
