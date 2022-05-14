import React, { useState, useContext, useRef } from 'react'
import '../styles/Create.scss';
import ProjectService from '../API/ProjectService';
import { Context } from "../index";
import { GrFormClose } from 'react-icons/gr';
import Button from '../components/UI/button/Button';
import Input from '../components/UI/input/Input';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Snackbar from '../components/UI/snackbar/Snackbar';


const Create = () => {
    const {store} = useContext(Context)
    const snackbarRef = useRef(null);
    const [messageSnackbar, setMessageSnackbar] = useState("");
    const [modeSnackbar, setModeSnackbar] = useState("");
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
                if (nameProject === "" || descriptionProject === "" || (typeProject === "donates" && paymentSystem === "" && priceProject === "") || (typeProject !== "team" && priceProject === ""))
                    showSnackbar('Вы заполнили не все поля', 'error');

                else if (typeProject === "team" && listStaff.length === 0)
                    showSnackbar('Добавьте хотя бы одну должность', 'error');

                else {
                    await ProjectService.createProject(store.isUserID, nameProject, descriptionProject, typeProject, priceProject, paymentSystem, listStaff);
            
                    setNameProject("");
                    setDescriptionProject("");
                    setPriceProject("");
                    setPaymentSystem("");
                    setListStaff([]);

                    showSnackbar('Проект успешно создан', 'success');
                }
            }
            else
                showSnackbar('Вы не авторизованы в системе', 'error');

        } catch (e) {
            showSnackbar('Ошибка при создании проекта', 'error');
        }
    }

    const showSnackbar = (message, mode) => {
        setMessageSnackbar(message);
        setModeSnackbar(mode)
        snackbarRef.current.show();
    }

    const addStaff = () => {
        if (nameStaff) {
            if (listStaff.indexOf(nameStaff) === -1) {
                setListStaff([...listStaff, nameStaff]);
                setNameStaff("");
            }
            else
                showSnackbar('Такая должность уже указана', 'error');
        }
    }

    const deleteStaff = (staff) => {
        setListStaff(listStaff.filter(item => item !== staff));
    }

    return (
        <div className='create'>
             <div className="create__editor">
                <TextareaAutosize
                    className="title"
                    aria-label="empty textarea"
                    placeholder="Заголовок"
                    maxLength={120}
                    value={nameProject}
                    onChange={e => setNameProject(e.target.value)}
                />

                <TextareaAutosize
                    className="description"
                    aria-label="empty textarea"
                    placeholder="Описание проекта"
                    value={descriptionProject}
                    onChange={e => setDescriptionProject(e.target.value)}
                />

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
            
            <Snackbar ref={snackbarRef} message={messageSnackbar} mode={modeSnackbar} />

        </div>
    );
};

export default Create;
