const AuthLayout = ({
    children
}: {
    children: React.ReactNode;
}) => {
    return (
        <div className="flex items-center justify-center h-full bg-slate-900">
            {children}
        </div>
    )
}

export default AuthLayout;