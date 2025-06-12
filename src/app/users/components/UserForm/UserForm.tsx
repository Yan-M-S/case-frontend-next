import { User } from "@/services/users"
import styles from './userForm.module.css'
import { useState, FormEvent, useMemo } from "react"
import { Loading } from "../ui/Loading" 

type FormState = {
  name: string
  email: string
}

type Props = {
  defaultValues?: Partial<User>
  onSubmit: (formData: User) => Promise<void>
  loading?: boolean
}

export function UserForm({ defaultValues, onSubmit, loading }: Props) {
    const [errors, setErrors] = useState<Partial<Record<keyof User, string>>>({})
    const [isSubmitting, setIsSubmitting] = useState(false)
    const initialFormData = useMemo(() => ({
    name: defaultValues?.name || '',
    email: defaultValues?.email || '',
    }), [defaultValues])

    const [formData, setFormData] = useState<Omit<FormState, 'id'>>(initialFormData)

    const validateForm = (): boolean => {
        const newErrors: Partial<Record<keyof User, string>> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'Nome é obrigatório'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email é obrigatório'
        } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
            newErrors.email = 'Email inválido'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        if (errors[name as keyof User]) {
            setErrors(prev => ({
                ...prev,
                [name]: undefined
            }))
        }
    }

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsSubmitting(true)
        try {
            await onSubmit({ ...formData, id: defaultValues?.id } as User)
        } catch (error) {
            console.error('Submission error:', error)
        }
    }

    return (
        <>
        {(loading || isSubmitting) && <Loading message={defaultValues?.id ? "Atualizando usuário..." : "Carregando..."} />}

        <form className={styles.formContainer} onSubmit={handleSubmit}>
            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="name">Nome</label>
                <input
                    className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name && (
                    <p id="name-error" className={styles.errorMessage}>
                        {errors.name}
                    </p>
                )}
            </div>

            <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Email</label>
                <input
                    className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
                {errors.email && (
                    <p id="email-error" className={styles.errorMessage}>
                        {errors.email}
                    </p>
                )}
            </div>

            <button className={styles.button} type="submit">Enviar</button>
        </form>
    </>
    )
}
