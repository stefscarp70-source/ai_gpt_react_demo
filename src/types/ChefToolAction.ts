export enum ChefToolAction {
    EXTRACT_FROM_FRIDGE = "EXTRACT_FROM_FRIDGE",
    RESTOCK = "RESTOCK",
    OTHER = "Other"
}

export enum ApplyState {
    NOTYET, 
    RUNNING, 
    COMPLETED = "Completed", 
    ERROR = "Apply error"
}